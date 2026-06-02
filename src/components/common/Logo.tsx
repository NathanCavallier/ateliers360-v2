import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Ateliers 360 Home">
      <div className="relative h-12 w-12 shrink-0">
        <Image
          src="/images/logo.png"
          alt="Ateliers 360 Logo"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 48px, 48px"
        />
      </div>
      <span className="text-xl font-bold font-headline text-inherit hidden sm:inline-block text-slate-300">Ateliers 360</span>
    </Link>
  );
};

export default Logo;
