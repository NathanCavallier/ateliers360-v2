import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Workshop } from '@/lib/types';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Atom,
  Clock,
  Cpu,
  Euro,
  ToyBrick,
  Users,
} from 'lucide-react';
import { CategoriesColors } from '../../lib/types';

type WorkshopCardProps = {
  workshop: Workshop;
};

const categoryIcons: Record<string, React.ReactNode> = {
  Robotics: <ToyBrick className="h-4 w-4" />,
  AI: <Cpu className="h-4 w-4" />,
  Physics: <Atom className="h-4 w-4" />,
  Technology: <Cpu className="h-4 w-4" />,
  Engineering: <ToyBrick className="h-4 w-4" />,
  Science: <Atom className="h-4 w-4" />,
  Robotique: <ToyBrick className="h-4 w-4" />,
  Programmation: <Cpu className="h-4 w-4" />,
};

// Background images par catégorie
const categoryBackgrounds: Record<string, string> = {
  Robotique:
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070',
  Robotics:
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070',
  Programmation:
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070',
  AI: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070',
  IA: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070',
  Science:
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070',
  Sciences:
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070',
  Physics:
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070',
  Engineering:
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070',
  Technology:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070',
  Pack: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022',
  default:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072',
};

// Helpers à placer en haut du fichier (ou dans un util séparé)
const hexToRgba = (hex: string, alpha = 1) => {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  const h = hex.replace('#', '');
  const bigint = parseInt(
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getContrastColor = (hex: string) => {
  if (!hex || hex === 'default') return '#000';
  const h = hex.replace('#', '');
  const bigint = parseInt(
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  // Calcul de luminance perçue
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#000' : '#003E8F';
};

const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  const locale = useLocale();
  const t = useTranslations('Workshops');
  const backgroundImage =
    categoryBackgrounds[workshop.category] || categoryBackgrounds.default;
  const categoryColorValue = workshop.categoryColor || CategoriesColors.all;
  const isDefaultColor = categoryColorValue === CategoriesColors.all;

  // Utiliser l'image de catégorie si pas d'image spécifique ou si c'est l'image générique de fallback
  const mainImage =
    workshop.image.imageUrl &&
    !workshop.image.imageUrl.includes('photo-1581091226825-a6a2a5aee158') &&
    !workshop.image.imageUrl.includes('photo-1517433447755-d14d2466041a')
      ? workshop.image.imageUrl
      : backgroundImage;

  return (
    <Card className="group flex flex-col overflow-hidden h-full transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-2 hover:border-primary/20 relative">
      {/* Background image de catégorie (subtile) */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
        <Image
          src={backgroundImage}
          alt={`${workshop.category} background`}
          fill
          className="object-cover"
        />
      </div>

      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={mainImage}
          alt={workshop.image.description}
          data-ai-hint={workshop.image.imageHint}
          width={800}
          height={400}
          loading="lazy"
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badge image non contractuelle */}
        <span
          className="absolute top-2 left-2 z-20 bg-black/70 text-white text-[0.70rem] px-2 py-0.5 rounded shadow font-semibold tracking-[0.02em] select-none pointer-events-none"
        >
          {t('non_contractual_image')}
        </span>
      </div>
      <CardHeader className="pb-3 relative z-10">
        <div className="flex justify-between items-start mb-3 gap-2">
          <Badge
            className={cn(
              'flex items-center gap-1 px-2.5 py-1 border rounded-full text-blue-700',
              // fallback classes when no custom color available
              {
                'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200':
                  isDefaultColor,
              }
            )}
            style={
              !isDefaultColor
                ? {
                    backgroundColor: hexToRgba(
                      categoryColorValue as string,
                      0.12
                    ),
                    color: getContrastColor(categoryColorValue as string),
                    borderColor: hexToRgba(categoryColorValue as string, 0.25),
                  }
                : undefined
            }
            variant="outline"
          >
            {categoryIcons[workshop.category] || null}
            {workshop.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            <Users className="h-3 w-3" />
            <span className="font-medium">{workshop.targetAudience}</span>
          </div>
        </div>
        <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
          {workshop.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col pt-0 relative z-10">
        <CardDescription className="flex-grow line-clamp-3 text-sm mb-4">
          {workshop.shortDescription}
        </CardDescription>

        {/* Info Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {workshop.duration && (
            <div className="flex items-center gap-1.5 text-xs bg-muted px-3 py-1.5 rounded-full">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium text-foreground">
                {workshop.duration}
              </span>
            </div>
          )}
          {workshop.price && (
            <div className="flex items-center gap-1.5 text-xs bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
              <Euro className="h-3.5 w-3.5 text-accent" />
              <span className="font-semibold text-accent">
                {workshop.price}€
              </span>
            </div>
          )}
        </div>

        {workshop.tags && workshop.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {workshop.tags.map((tag) => {
              const normalizedTag = tag.toLowerCase();
              const badgeClass = normalizedTag.includes('distanciel')
                ? 'bg-cyan-100 text-cyan-800 border-cyan-200'
                : normalizedTag.includes('hybride')
                ? 'bg-violet-100 text-violet-800 border-violet-200'
                : normalizedTag.includes('projet')
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : 'bg-muted text-foreground border-border';
              const label = normalizedTag.includes('projet')
                ? t('format_projet_eleve')
                : normalizedTag.includes('distanciel')
                ? t('format_distanciel')
                : normalizedTag.includes('hybride')
                ? t('format_hybride')
                : normalizedTag.charAt(0).toUpperCase() + normalizedTag.slice(1);

              return (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${badgeClass}`}
                >
                  {label}
                </span>
              );
            })}
          </div>
        )}

        {/* Learning Objectives */}
        <div className="pt-4 border-t">
          <ul className="space-y-2 text-sm mb-4">
            {workshop.learningObjectives
              .slice(0, 2)
              .map((obj: string, i: number) => (
                <li key={i} className="flex items-start">
                  <svg
                    className="w-4 h-4 mr-2 mt-0.5 text-accent flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-muted-foreground leading-tight">
                    {obj}
                  </span>
                </li>
              ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex gap-2">
            <Button asChild className="flex-1 group/btn" size="sm">
              <Link href={`/${locale}/ateliers/${workshop.slug}`}>
                {t('discover')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-32" size="sm">
              <Link href={`/${locale}/reserver?atelier=${workshop.id}`}>
                Réserver
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopCard;
