import type { Metadata } from 'next';
import { getAteliersMetadata } from '../home-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getAteliersMetadata(locale);
}

export default function AteliersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
