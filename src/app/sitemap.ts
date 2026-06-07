import { MetadataRoute } from 'next';
import { getWorkshops, getBlogArticles } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.ateliers360.fr';

  // Pages statiques
  const staticPages = [
    '',
    '/ateliers',
    '/a-propos',
    '/pour-les-ecoles',
    '/pour-les-entreprises',
    '/pour-les-entreprises/contact',
    '/pour-les-entreprises/offres',
    '/pour-les-structures',
    '/pour-les-structures/contact',
    '/catalogues',
    '/constructeur',
    '/dashboard',
    '/dashboard/ateliers',
    '/dashboard/ateliers/nouveau',
    '/dashboard/reservations',
    '/disciplines',
    '/modules',
    '/packs',
    '/stages',
    '/tarifs',
    '/calendrier',
    '/nous-rejoindre',
    '/blog',
    '/recompenses',
    '/contrats',
    '/familles',
    '/reserver',
    '/contact',
    '/mentions-legales',
    '/politique-confidentialite',
    '/nos-activites',
    '/passerelle-jeunesse',
    '/le-projet',
    '/demander-mission',
    '/faq',
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.flatMap((page) => [
    {
      url: `${baseUrl}/fr${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    },
    {
      url: `${baseUrl}/en${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    },
  ]);

  // Pages d'ateliers dynamiques
  let workshopRoutes: MetadataRoute.Sitemap = [];
  try {
    const workshops = await getWorkshops();
    workshopRoutes = workshops.flatMap((workshop: any) => [
      {
        url: `${baseUrl}/fr/ateliers/${workshop.slug}`,
        lastModified: new Date(workshop.created_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/en/ateliers/${workshop.slug}`,
        lastModified: new Date(workshop.created_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/fr/ateliers/${workshop.id}`,
        lastModified: new Date(workshop.created_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/en/ateliers/${workshop.id}`,
        lastModified: new Date(workshop.created_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/fr/ateliers/${workshop.id}/modifier`,
        lastModified: new Date(workshop.created_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/en/ateliers/${workshop.id}/modifier`,
        lastModified: new Date(workshop.created_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
    ]);
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des ateliers pour le sitemap:',
      error
    );
  }

  // Pages de blog dynamiques
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await getBlogArticles();
    blogRoutes = articles.flatMap((article: any) => [
      {
        url: `${baseUrl}/fr/blog/${article.slug}`,
        lastModified: new Date(article.published_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/en/blog/${article.slug}`,
        lastModified: new Date(article.published_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
    ]);
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des articles pour le sitemap:',
      error
    );
  }

  return [...staticRoutes, ...workshopRoutes, ...blogRoutes];
}
