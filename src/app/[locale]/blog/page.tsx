'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Clock, 
  User, 
  Tag as TagIcon, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  X
} from 'lucide-react';
import { getBlogArticles } from '@/lib/supabase';
import { BlogArticle } from '@/lib/types';

export default function BlogPage() {
  const t = useTranslations('BlogPage');
  const locale = useLocale();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function loadArticles() {
      try {
        const supabaseArticles = await getBlogArticles();
        if (supabaseArticles && supabaseArticles.length > 0) {
          setArticles(supabaseArticles);
        }
      } catch (error) {
        console.error('Erreur chargement articles depuis Supabase:', error);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  // Obtenir toutes les catégories uniques
  const categories = useMemo(() => {
    const cats = new Set(articles.map(a => a.category).filter(Boolean));
    return Array.from(cats);
  }, [articles]);

  // Filtrer et trier les articles
  const filteredArticles = useMemo(() => {
    let filtered = [...articles];

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Tri
    const sorted = filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.published_at || '').getTime() - new Date(b.published_at || '').getTime();
      }
      return 0;
    });

    return sorted;
  }, [articles, searchQuery, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    return filteredArticles.slice(startIndex, startIndex + articlesPerPage);
  }, [filteredArticles, currentPage, articlesPerPage]);

  // Réinitialiser la page lors du changement de filtres
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  // Compter les articles actifs par catégorie
  const categoryCounts: Record<string, number> = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach(article => {
      if (article.category) {
        counts[article.category] = (counts[article.category] || 0) + 1;
      }
    });
    return counts;
  }, [articles]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCategory !== 'all') count++;
    return count;
  }, [searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-12" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              {t('title')}
            </h1>
            <p className="text-xl text-primary-foreground/90">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filtres Section */}
      <section className="w-full py-8 border-b bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Barre de recherche */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 h-12 text-base"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Filtres avancés - Desktop */}
            <div className="hidden lg:flex items-center justify-between gap-4">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="all" className="relative">
                    {t('filter_all')}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {articles.length}
                    </Badge>
                  </TabsTrigger>
                  {categories.map(cat => (
                    <TabsTrigger key={cat} value={cat || 'all'} className="relative">
                      {cat}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {cat ? (categoryCounts[cat] || 0) : 0}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder={t('sort_by')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">{t('sort_newest')}</SelectItem>
                    <SelectItem value="oldest">{t('sort_oldest')}</SelectItem>
                    <SelectItem value="popular">{t('sort_popular')}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={articlesPerPage.toString()} onValueChange={(value) => setArticlesPerPage(Number(value))}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 {t('per_page')}</SelectItem>
                    <SelectItem value="9">9 {t('per_page')}</SelectItem>
                    <SelectItem value="12">12 {t('per_page')}</SelectItem>
                    <SelectItem value="24">24 {t('per_page')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filtres avancés - Mobile */}
            <div className="lg:hidden space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {t('filters')}
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {showFilters && (
                <Card className="p-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('category')}</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('filter_all')} ({articles.length})</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat || 'all'}>
                            {cat} ({cat ? (categoryCounts[cat] || 0) : 0})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('sort_by')}</label>
                    <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">{t('sort_newest')}</SelectItem>
                        <SelectItem value="oldest">{t('sort_oldest')}</SelectItem>
                        <SelectItem value="popular">{t('sort_popular')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('articles_per_page')}</label>
                    <Select value={articlesPerPage.toString()} onValueChange={(value) => setArticlesPerPage(Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 {t('articles')}</SelectItem>
                        <SelectItem value="9">9 {t('articles')}</SelectItem>
                        <SelectItem value="12">12 {t('articles')}</SelectItem>
                        <SelectItem value="24">24 {t('articles')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              )}
            </div>

            {/* Info résultats et reset */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground">
                {t('showing')} <span className="font-semibold text-foreground">{paginatedArticles.length}</span> {t('of')} <span className="font-semibold text-foreground">{filteredArticles.length}</span> {filteredArticles.length === 1 ? t('article') : t('articles')}
              </div>
              
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  {t('clear_filters')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="w-full py-12 flex-1">
        <div className="container px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedArticles.map((article) => (
                <Card key={article.slug} className="hover:shadow-lg transition-shadow overflow-hidden group">
                  {article.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.image_url} 
                        alt={article.titre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {article.category && (
                        <Badge className="absolute top-3 right-3">
                          {article.category}
                        </Badge>
                      )}
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(article.published_at || '').toLocaleDateString(locale, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      {article.read_time && (
                        <>
                          <span>•</span>
                          <Clock className="h-4 w-4" />
                          <span>{article.read_time} {t('read_time')}</span>
                        </>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {article.titre}
                    </CardTitle>
                    {article.author && (
                      <CardDescription className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <TagIcon className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/${locale}/blog/${article.slug}`}>
                        {t('read_more')} →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {paginatedArticles.length === 0 && (
                <div className="col-span-full">
                  <Card className="text-center py-12">
                    <CardContent className="pt-6 space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                        <Search className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold mb-2">{t('no_articles')}</p>
                        <p className="text-sm text-muted-foreground">{t('no_articles_desc')}</p>
                      </div>
                      {activeFiltersCount > 0 && (
                        <Button 
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                          }}
                          variant="outline"
                        >
                          <X className="h-4 w-4 mr-2" />
                          {t('clear_filters')}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  {t('page')} {currentPage} {t('of')} {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? 'default' : 'outline'}
                          size="icon"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground hidden sm:block">
                  {t('showing')} {((currentPage - 1) * articlesPerPage) + 1}-{Math.min(currentPage * articlesPerPage, filteredArticles.length)} {t('of')} {filteredArticles.length}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
