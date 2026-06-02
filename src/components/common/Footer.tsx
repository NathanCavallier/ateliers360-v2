"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const locale = useLocale();
  const withLocale = (path: string) => `/${locale}${path}`;

  return (
    <footer className="border-t border-slate-200 bg-background/95 text-slate-800">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-5">
            <Logo />
            <p className="max-w-md text-sm leading-7 text-slate-600">
              {t("description")}
            </p>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@ateliers360.fr</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>France</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
              {t("discover")}
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href={withLocale("/ateliers")} className="hover:text-primary">
                  {tNav("workshops_list")}
                </Link>
              </li>
              <li>
                <Link href={withLocale("/modules")} className="hover:text-primary">
                  {tNav("modules")}
                </Link>
              </li>
              <li>
                <Link href={withLocale("/packs")} className="hover:text-primary">
                  {tNav("packs")}
                </Link>
              </li>
              <li>
                <Link href={withLocale("/recompenses")} className="hover:text-primary">
                  {tNav("rewards")}
                </Link>
              </li>
              <li>
                <Link href={withLocale("/contact")} className="hover:text-primary">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
              {t("legal")}
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href={withLocale("/politique-confidentialite")} className="hover:text-primary">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href={withLocale("/cgv")} className="hover:text-primary">
                  {t("cgv")}
                </Link>
              </li>
              <li>
                <Link href={withLocale("/conditions-utilisation")} className="hover:text-primary">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href={withLocale("/mentions-legales")} className="hover:text-primary">
                  {tNav("mentions_legales") || "Mentions Légales"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Ateliers 360. {t("rights_reserved")}
          </p>

          <div className="flex items-center gap-4 text-slate-500">
            <Link href="https://facebook.com/ateliers360" className="hover:text-primary">
              <Facebook size={20} />
            </Link>
            <Link href="https://instagram.com/ateliers360" className="hover:text-primary">
              <Instagram size={20} />
            </Link>
            <Link href="https://youtube.com/@ateliers360?si=N4a2XXwO-usBxHeN" className="hover:text-primary">
              <Youtube size={20} />
            </Link>
            <Link href="https://linkedin.com/company/ateliers360" className="hover:text-primary">
              <Linkedin size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
