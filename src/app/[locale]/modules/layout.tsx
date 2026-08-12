import type { Metadata } from 'next';
import { getModulesMetadata } from '../home-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getModulesMetadata(locale);
}

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
