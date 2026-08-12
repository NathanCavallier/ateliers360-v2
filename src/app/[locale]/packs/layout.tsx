import type { Metadata } from 'next';
import { getPacksMetadata } from '../home-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPacksMetadata(locale);
}

export default function PacksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
