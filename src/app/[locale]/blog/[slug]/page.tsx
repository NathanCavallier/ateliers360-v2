'use client';

import { useTranslations, useLocale } from 'next-intl';
import { notFound, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Clock, User, Tag as TagIcon, Share2, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { getBlogArticleBySlug } from '@/lib/supabase';
import { BlogArticle } from '@/lib/types';

export default function BlogArticlePage() {
  const t = useTranslations('BlogPage');
  const locale = useLocale();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);


  useEffect(() => {
    async function loadArticle() {
      try {
        const supabaseArticle = await getBlogArticleBySlug(slug);
        if (supabaseArticle) {
          setArticle(supabaseArticle);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Erreur chargement article:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article?.titre || '';

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 w-32 bg-muted animate-pulse mb-8"></div>
          <div className="h-12 w-3/4 bg-muted animate-pulse mb-4"></div>
          <div className="h-6 w-1/2 bg-muted animate-pulse mb-12"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted animate-pulse"></div>
            <div className="h-4 bg-muted animate-pulse"></div>
            <div className="h-4 bg-muted animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Retour au blog */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href={`/${locale}/blog`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('back_to_blog')}
          </Link>
        </Button>

        <article>
          {/* En-tête */}
          <header className="mb-12">
            {article.category && (
              <Badge className="mb-4">{article.category}</Badge>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.titre}</h1>
            
            {/* Métadonnées */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
              {article.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(article.published_at).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {article.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.read_time} {t('read_time')}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Boutons de partage */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => handleShare('facebook')}>
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')}>
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('email')}>
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('copy')}>
                {linkCopied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    {t('link_copied')}
                  </>
                ) : (
                  <>
                    <LinkIcon className="h-4 w-4 mr-2" />
                    {t('copy_link')}
                  </>
                )}
              </Button>
            </div>

            <Separator className="mt-8" />
          </header>

          {/* Contenu */}
          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            {article.contenu.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-3xl font-bold mt-12 mb-6">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-2xl font-semibold mt-8 mb-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={index} className="mb-6 text-lg leading-relaxed">
                  {paragraph.trim()}
                </p>
              );
            })}
          </div>

          <Separator className="my-12" />

          {/* Boutons de partage footer */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">{t('share')}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="outline" size="sm" onClick={() => handleShare('facebook')}>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')}>
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('copy')}>
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
