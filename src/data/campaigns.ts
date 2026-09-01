// Données des campagnes marketing
export type Campaign = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage?: string;
  targetAudience: string;
  keyBenefits: string[];
  callToAction: string;
  formType: 'contact' | 'reservation' | 'inquiry';
  relatedWorkshopIds?: number[];
  startDate?: string;
  endDate?: string;
  utm_campaign: string;
  testimonialCount?: number;
};

export const campaigns: Record<string, Campaign> = {
  'robotique-rentree-2026': {
    slug: 'robotique-rentree-2026',
    title: 'Atelier Robotique — Rentrée 2026',
    subtitle: 'Captivez vos élèves avec la robotique',
    description:
      'Une séance clé en main pour construire et programmer un robot. Adapté aux classes du primaire et du secondaire.',
    targetAudience: 'Enseignants, responsables d\'établissements',
    keyBenefits: [
      'Atelier complètement préparé — rien à chercher',
      'Robots fournis et testés',
      'Accompagnement pédagogique détaillé',
      'Accessibilité pour tous les niveaux',
    ],
    callToAction: 'Réserver dès maintenant',
    formType: 'reservation',
    utm_campaign: 'robotique_rentree_2026',
    testimonialCount: 3,
  },
  'ecologie-ete-2026': {
    slug: 'ecologie-ete-2026',
    title: 'Atelier Écologie — Été 2026',
    subtitle: 'Sensibilisez les jeunes à l\'environnement',
    description:
      'Un atelier immersif pour explorer les enjeux écologiques et proposer des solutions. Parfait pour les centres aérés et les camps d\'été.',
    targetAudience: 'Centres aérés, camps d\'été, collectivités',
    keyBenefits: [
      'Contenu ludique et interactif',
      'Réflexions pratiques sur le développement durable',
      'Travail d\'équipe et créativité',
      'Ressources pédagogiques incluses',
    ],
    callToAction: 'Demander plus d\'informations',
    formType: 'inquiry',
    utm_campaign: 'ecologie_ete_2026',
    testimonialCount: 2,
  },
  'portes-ouvertes-grand-est': {
    slug: 'portes-ouvertes-grand-est',
    title: 'Portes ouvertes — Grand Est',
    subtitle: 'Découvrez nos ateliers en personne',
    description:
      'Venez nous rencontrer et explorer nos ateliers lors d\'une journée portes ouvertes spéciale dans le Grand Est.',
    targetAudience: 'Familles, enseignants, établissements',
    keyBenefits: [
      'Accès libre à nos espaces',
      'Démonstrations en direct',
      'Rencontrez notre équipe',
      'Tarifs spéciaux de lancement',
    ],
    callToAction: 'S\'inscrire aux portes ouvertes',
    formType: 'contact',
    utm_campaign: 'portes_ouvertes_grand_est',
    startDate: '2026-09-15',
    endDate: '2026-09-20',
  },
};

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns[slug];
}

export function getAllCampaigns(): Campaign[] {
  return Object.values(campaigns);
}
