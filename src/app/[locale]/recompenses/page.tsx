import Link from 'next/link';
import { Award, FileText, Gift, Medal, Sparkles, Trophy } from 'lucide-react';
import RewardsOverview from '@/components/rewards/RewardsOverview';

type Props = { params: Promise<{ locale: string }> };

const heroBadges = [
  'Badges numériques',
  'Attestations PDF',
  'Diplômes de fin de cycle',
  'Stickers et médailles',
];

const virtualRewards = [
  {
    title: 'Badges numériques',
    description:
      'Récompensez les compétences acquises avec des badges visibles sur le dashboard de l’apprenant.',
    icon: Sparkles,
  },
  {
    title: 'Attestations PDF',
    description:
      'Générez automatiquement des attestations personnalisées avec QR code vérifiable.',
    icon: FileText,
  },
  {
    title: 'Diplômes et portfolios',
    description:
      'Valorisez les parcours avec des diplômes et un mini-portefeuille de projets partageable.',
    icon: Trophy,
  },
];

const physicalRewards = [
  {
    title: 'Stickers thématiques',
    description: 'Des stickers à collectionner pour chaque domaine d’apprentissage.',
    icon: Gift,
  },
  {
    title: 'Cartes de compétences',
    description: 'Cartes imprimées à collectionner et afficher en fin de parcours.',
    icon: Award,
  },
  {
    title: 'Médailles 3D',
    description: 'Une récompense tangibles pour les projets ou hackathons marquants.',
    icon: Medal,
  },
];

const levels = [
  {
    label: 'Niveau 1',
    name: 'Explorateur',
    description: 'Premières découvertes, curiosité et premières réussites.',
    style: 'bg-slate-100',
  },
  {
    label: 'Niveau 2',
    name: 'Maker',
    description: 'Projets pratiques et premières compétences techniques validées.',
    style: 'bg-sky-100',
  },
  {
    label: 'Niveau 3',
    name: 'Expert',
    description: 'Réussite avancée et capacité à aller plus loin en autonomie.',
    style: 'bg-violet-100',
  },
  {
    label: 'Niveau 4',
    name: 'Ambassadeur',
    description: 'Référent du groupe, mentor et porteur de projet valorisé.',
    style: 'bg-amber-100',
  },
];

const timeline = [
  {
    step: '1',
    title: 'Choix de l’atelier',
    description:
      'L’élève participe, apprend et accumule des compétences observables.',
  },
  {
    step: '2',
    title: 'Validation pédagogique',
    description:
      'L’animateur valide les acquis et déclenche la création du badge ou de l’attestation.',
  },
  {
    step: '3',
    title: 'Remise de la récompense',
    description:
      'Le badge numérique est visible, l’attestation est téléchargeable, et la récompense physique peut être remise.',
  },
  {
    step: '4',
    title: 'Suivi du progrès',
    description:
      'Le parcours est suivi dans le dashboard et la famille peut retrouver les preuves d’apprentissage.',
  },
];

const stats = [
  { value: '25+', label: 'Badges disponibles' },
  { value: '100%', label: 'Attestations vérifiables' },
  { value: '4', label: 'Niveaux de progression' },
];

const faqs = [
  {
    question: 'Comment sont générées les attestations ?',
    answer:
      'Chaque attestation est personnalisée avec le nom, l’atelier, la date et un QR code qui renvoie à une vérification publique.',
  },
  {
    question: 'Que reçoit l’apprenant ?',
    answer:
      'Un badge numérique immédiat et, selon le niveau, un certificat ou une récompense physique.',
  },
  {
    question: 'Peut-on commander des objets physiques ?',
    answer:
      'Oui, le catalogue propose des stickers, médailles et cartes de compétences pour renforcer l’impact des ateliers.',
  },
  {
    question: 'Les attestations sont-elles contrôlées ?',
    answer:
      'Oui, chaque attestation est vérifiable en ligne via un token unique et sécurisé.',
  },
];

export default async function RewardsPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="container py-12 px-4 lg:px-6">
      <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            Reconnaissance des apprentissages
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Récompenses conçues pour valoriser les apprentissages et motiver les jeunes.
            </h1>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              Badges numériques, attestations vérifiables, diplômes personnalisés et récompenses physiques : un système complet qui donne du sens aux progrès réalisés en atelier.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {heroBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900"
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/${locale}/recompenses/catalogue`}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 sm:w-auto"
            >
              Voir le catalogue
            </Link>
            <Link
              href={`/${locale}/recompenses/attestation/verify`}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 sm:w-auto"
            >
              Vérifier une attestation
            </Link>
          </div>
        </div>
      </section>

      <RewardsOverview />

      <section className="mt-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Récompenses virtuelles</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Des récompenses qui se déploient immédiatement dans l’espace apprenant : badges, attestations, diplômes et portfolio automatique.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {virtualRewards.map((reward) => {
                const Icon = reward.icon;
                return (
                  <div key={reward.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold">{reward.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{reward.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Récompenses physiques</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Des objets concrets pour renforcer la fierté et la motivation : stickers, cartes de compétences et médailles 3D.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {physicalRewards.map((reward) => {
                const Icon = reward.icon;
                return (
                  <div key={reward.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold">{reward.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{reward.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Les 4 niveaux de progression
            </p>
            <h2 className="text-2xl font-semibold">Du premier badge au rôle d’ambassadeur.</h2>
          </div>
          <div className="hidden sm:block text-sm text-muted-foreground">
            Un parcours clair, visible et reconnaissable pour chaque participant.
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          {levels.map((level) => (
            <div key={level.label} className={`${level.style} rounded-3xl border border-border p-5 text-center`}>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {level.label}
              </div>
              <div className="mt-3 text-lg font-semibold">{level.name}</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {level.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6 rounded-3xl border border-border bg-card p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Exemple d’attestation
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Un certificat visible et professionnel.</h2>
          </div>
          <div className="grid gap-4 rounded-3xl border border-border bg-background p-6">
            <div className="rounded-3xl bg-slate-950/5 p-5">
              <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                ATELIERS 360
              </div>
              <div className="text-2xl font-semibold">Attestation de participation</div>
              <p className="mt-2 text-sm text-muted-foreground">Délivrée à l’issue de l’atelier.</p>
              <div className="mt-4 text-3xl font-semibold">Prénom Nom</div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">Atelier : Robotique créative</div>
                <div className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">Date : 23 mai 2026</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Python', 'Robotique', 'Créativité'].map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="h-20 w-20 rounded-2xl bg-slate-800"></div>
                <div className="text-sm text-muted-foreground">Code unique vérifiable via QR code.</div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-muted p-5 text-center">
                <div className="text-3xl font-semibold">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-border bg-card p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Comment ça se passe
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Un parcours simple et transparent.</h2>
          </div>
          <div className="space-y-6">
            {timeline.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-3 rounded-3xl border border-border bg-background p-5">
            {faqs.map((faq) => (
              <div key={faq.question} className="space-y-2">
                <p className="font-semibold">{faq.question}</p>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-primary/5 p-6 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Besoin d’aide ?
            </div>
            <p className="mt-3 text-sm text-slate-700">
              Contactez notre équipe pour créer un parcours de récompenses adapté à votre atelier.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 sm:w-auto"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
