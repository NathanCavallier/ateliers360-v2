import CreateWorkshopForm from "@/components/create/CreateWorkshopForm";
import { Lightbulb } from "lucide-react";
import {useTranslations} from 'next-intl';

export default function CreatePage() {
  const t = useTranslations('CreatePage');
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-block bg-yellow-200/50 text-yellow-800 p-3 rounded-full mb-4">
          <Lightbulb className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-headline font-bold">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      <div className="mx-auto max-w-3xl mt-12">
        <CreateWorkshopForm />
      </div>
    </div>
  );
}
