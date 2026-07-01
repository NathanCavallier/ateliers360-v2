import Link from 'next/link';
import { Award, FileText, Gift, Medal, Sparkles, Star } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

const catalogueItems = [
  {
    title: 'Badges compétences',
    description:
      'Plus de 25 badges numériques pour valoriser les acquis en code, robotique, design et sciences.',
    icon: Award,
    tags: ['Python', 'Robotique', '3D', 'IA'],
  },
  {
    title: 'Attestations vérifiables',
    description:
      'Certificats personnalisés avec QR code et historique de validation accessible par token.',
    icon: FileText,
    tags: ['PDF', 'QR code', 'Vérifiable', 'Téléchargeable'],
  },
  {
    title: 'Stickers et cartes',
    description:
      'Récompenses physiques faciles à distribuer : stickers colorés et cartes à collectionner.',
    icon: Gift,
    tags: ['Stickers', 'Cartes', 'Collection'],
  },
  {
    title: 'Médailles 3D',
    description:
      'Médailles imprimées pour les projets remarquables, hackathons et fin de cycle.',
    icon: Medal,
    tags: ['Impression 3D', 'Trophée', 'Projet'],
  },
  {
    title: 'Diplômes personnalisés',
    description:
      'Diplômes aux couleurs d’Ateliers 360 Éducation, signés et formatés pour être affichés.',
    icon: Star,
    tags: ['Format A4', 'Signature', 'Design'],
  },
];

export default async function CataloguePage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="container py-12 px-4 lg:px-6">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
          Catalogue des récompenses
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Tous les moyens pour célébrer les progrès.
        </h1>
        <p className="max-w-3xl leading-7 text-slate-600">
          Parcourez les récompenses numériques et physiques qui accompagnent nos ateliers. Chaque élément a été pensé pour renforcer la motivation et donner de la valeur aux apprentissages.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {catalogueItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={`/${locale}/recompenses`}
          className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 sm:w-auto"
        >
          Retour à la page Récompenses
        </Link>
        <Link
          href={`/${locale}/recompenses/attestation/verify`}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 sm:w-auto"
        >
          Vérifier une attestation
        </Link>
      </div>
    </div>
  );
}
