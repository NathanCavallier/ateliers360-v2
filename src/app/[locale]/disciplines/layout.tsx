import type { Metadata } from 'next';
import { getDisciplinesMetadata } from '../home-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getDisciplinesMetadata(locale);
}

export default function DisciplinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
