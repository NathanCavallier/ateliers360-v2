import MissionForm from '@/components/mission-form';

export async function generateMetadata() {
  return {
    title: 'Demander une mission | Passerelle Jeunesse',
    description: 'Formulaire de demande de mission Passerelle Jeunesse.',
  };
}

export default function DemanderMissionPage() {
  return <MissionForm />;
}
