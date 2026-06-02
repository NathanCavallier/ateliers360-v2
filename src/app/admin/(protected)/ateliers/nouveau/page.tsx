import { CreateWorkshopForm } from '@/components/admin/CreateWorkshopForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CreateWorkshopPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/ateliers">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux ateliers
          </Button>
        </Link>
      </div>

      <CreateWorkshopForm />
    </div>
  );
}
