import type { BlogArticle, WorkshopDB } from './types';

export const DEFAULT_OG_IMAGE = 'https://www.ateliers360.fr/images/logo.png';
export const SITE_NAME = 'Ateliers 360';
export const SITE_URL = 'https://www.ateliers360.fr';

export function getWorkshopOgImage(workshop: WorkshopDB) {
  return workshop.image_og_url || workshop.image_url || DEFAULT_OG_IMAGE;
}

export function getArticleOgImage(article: BlogArticle) {
  return article.image_url || DEFAULT_OG_IMAGE;
}
