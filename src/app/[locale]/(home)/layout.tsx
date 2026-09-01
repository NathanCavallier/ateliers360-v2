import type { Metadata } from 'next';
import { getHomeMetadata } from '../home-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getHomeMetadata(locale);
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
