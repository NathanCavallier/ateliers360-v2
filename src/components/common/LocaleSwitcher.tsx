'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { FR, GB_ENG } from "country-flag-icons/react/3x2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LocaleOption = {
  value: string;
  label: string;
  flag: React.ComponentType<any>;
};

const locales: LocaleOption[] = [
  { value: 'en', label: 'English', flag: GB_ENG },
  { value: 'fr', label: 'Français', flag: FR },
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = locales.find((l) => l.value === locale) || locales[0];

  const onSelectChange = (value: string) => {
    const segments = pathname.split('/');
    segments[1] = value;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  const CurrentFlag = currentLocale.flag;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="inline-flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-2 px-2 py-1 rounded-full bg-slate-100/50 text-xs uppercase tracking-[0.24em] text-slate-800">
            <CurrentFlag className="h-4 w-4" /> {currentLocale.label}
          </span>
          <span className="sm:hidden inline-flex items-center">
            <CurrentFlag className="h-4 w-4" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => {
          const FlagComponent = loc.flag;
          return (
            <DropdownMenuItem
              key={loc.value}
              onClick={() => onSelectChange(loc.value)}
              className={locale === loc.value ? 'bg-accent' : ''}
            >
              <span className="mr-2">
                <FlagComponent className="h-4 w-4" />
              </span>
              {loc.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
