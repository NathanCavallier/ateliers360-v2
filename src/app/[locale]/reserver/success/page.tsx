import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Calendar, 
  Home, 
  ArrowRight,
  Clock,
  Mail
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string; reservation_id?: string }>;
}

export default async function ReservationSuccessPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const t = await getTranslations('ReservationSuccessPage');
  
  const sessionId = searchParams.session_id;
  const reservationId = searchParams.reservation_id;
  
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{t('title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>

          {/* Confirmation Alert */}
          <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-950/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-900 dark:text-green-100">{t('confirmation.title')}</AlertTitle>
            <AlertDescription className="text-green-800 dark:text-green-200">
              {t('confirmation.description')}
            </AlertDescription>
          </Alert>

          {/* Reservation Info */}
          {reservationId && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('details.title')}</CardTitle>
                <CardDescription>
                  {t('details.subtitle', { id: reservationId })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('details.check_email')}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Next Steps Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {t('next_steps.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    1
                  </span>
                  <p className="text-sm">{t('next_steps.step1')}</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    2
                  </span>
                  <p className="text-sm">{t('next_steps.step2')}</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    3
                  </span>
                  <p className="text-sm">{t('next_steps.step3')}</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    4
                  </span>
                  <p className="text-sm">{t('next_steps.step4')}</p>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Payment Reference */}
          {sessionId && (
            <div className="text-xs text-muted-foreground text-center mb-6">
              {t('payment_ref')}: {sessionId.substring(0, 20)}...
            </div>
          )}

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button asChild className="flex-1">
              <Link href={`/${params.locale}/ateliers`}>
                {t('cta.explore')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href={`/${params.locale}`}>
                <Home className="mr-2 h-4 w-4" />
                {t('cta.home')}
              </Link>
            </Button>
          </div>

          {/* Support Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              {t('support.question')}{' '}
              <Link href={`/${params.locale}/contact`} className="text-primary hover:underline">
                {t('support.contact_us')}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
