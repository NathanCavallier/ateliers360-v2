'use client';

import ContactForm from "@/components/contact/ContactForm";
import { Mail, Phone, MapPin, Clock, Facebook, Youtube, Linkedin, Instagram } from "lucide-react";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  const t = useTranslations('ContactPage');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full overflow-hidden bg-slate-950 text-white">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 shadow-2xl">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
                alt="Contactez-nous"
                fill
                className="object-cover opacity-30"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-slate-950/70" />
            </div>
            <div className="relative z-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center px-6 py-14 md:px-12 md:py-16">
              <div className="space-y-4">
                <Badge className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent-foreground">
                  {t('contact_badge') || 'Contact'}
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {t('title')}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-200/90">
                  {t('subtitle')}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-white">{t('need_help')}</h2>
                <p className="mt-3 text-sm text-slate-200/80 leading-relaxed">
                  {t('hero_cta') || 'Écrivez-nous et nous vous recontactons rapidement.'}
                </p>
                <div className="mt-6 grid gap-3">
                  <div className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{t('pole_ateliers')}</p>
                    <a href="mailto:ateliers@ateliers360.fr" className="mt-2 block text-sm font-medium text-white hover:text-accent">ateliers@ateliers360.fr</a>
                  </div>
                  <div className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{t('pole_passerelle')}</p>
                    <a href="mailto:passerelle@ateliers360.fr" className="mt-2 block text-sm font-medium text-white hover:text-accent">passerelle@ateliers360.fr</a>
                  </div>
                  <div className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{t('pole_cavalier')}</p>
                    <a href="mailto:numerique@ateliers360.fr" className="mt-2 block text-sm font-medium text-white hover:text-accent">numerique@ateliers360.fr</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('contact_info')}</CardTitle>
                  <CardDescription>{t('contact_info_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('email')}</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p><span className="font-medium text-foreground">{t('email_ateliers')}</span> <a href="mailto:ateliers@ateliers360.fr" className="hover:text-primary transition-colors">ateliers@ateliers360.fr</a></p>
                        <p><span className="font-medium text-foreground">{t('email_passerelle')}</span> <a href="mailto:passerelle@ateliers360.fr" className="hover:text-primary transition-colors">passerelle@ateliers360.fr</a></p>
                        <p><span className="font-medium text-foreground">{t('email_cavalier')}</span> <a href="mailto:numerique@ateliers360.fr" className="hover:text-primary transition-colors">numerique@ateliers360.fr</a></p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('phone')}</h3>
                      <a href="tel:+33753612471" className="text-muted-foreground hover:text-primary transition-colors">
                        +33 7 53 61 24 71
                      </a>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('office')}</h3>
                      <p className="text-muted-foreground">
                        {t('location_value')}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('hours')}</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{t('hours_weekdays')}</p>
                        <p>{t('hours_weekends')}</p>
                        <p>{t('hours_sundays')}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('social_title')}</CardTitle>
                  <CardDescription>{t('social_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <a href="https://facebook.com/ateliers360" target="_blank" rel="noopener noreferrer"
                       title="Facebook" aria-label="Suivez-nous sur Facebook"
                       className="bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary p-3 rounded-full transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="https://linkedin.com/company/ateliers360" target="_blank" rel="noopener noreferrer"
                       title="LinkedIn" aria-label="Suivez-nous sur LinkedIn"
                       className="bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary p-3 rounded-full transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="https://youtube.com/@ateliers360?si=N4a2XXwO-usBxHeN" target="_blank" rel="noopener noreferrer"
                       title="YouTube" aria-label="Suivez-nous sur YouTube"
                       className="bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary p-3 rounded-full transition-colors">
                      <Youtube className="h-5 w-5" />
                    </a>
                    <a href="https://instagram.com/ateliers360" target="_blank" rel="noopener noreferrer"
                       title="Instagram" aria-label="Suivez-nous sur Instagram"
                       className="bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary p-3 rounded-full transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('formTitle')}</CardTitle>
                  <CardDescription>{t('form_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/*
      <section className="w-full py-12 md:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{t('map_title')}</h2>
            <p className="text-muted-foreground">{t('map_desc')}</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden border shadow-md">
              <iframe
                src="https://www.google.com/maps?q=France&output=embed"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title={t('map_title')}
              ></iframe>
            </div>
          </div>
        </div>
      </section>*/}
    </div>
  );
}
