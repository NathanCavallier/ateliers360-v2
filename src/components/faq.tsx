'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FAQItem {
  category: 'ateliers' | 'paiement' | 'general';
  question: string;
  answer: string;
}

const faqItemsFr: FAQItem[] = [
  {
    category: 'ateliers',
    question: 'Quel est le public visé par Ateliers 360 ?',
    answer:
      'Ateliers 360 propose des ateliers éducatifs pour les enfants et les jeunes (6-18 ans) autour de la science, de la robotique, du code, de l’IA et de l’écologie numérique. Nous intervenons auprès des écoles, associations et familles.',
  },
  {
    category: 'ateliers',
    question: 'Quels types d’ateliers proposez-vous ?',
    answer:
      'Nos ateliers couvrent : robotique & automatismes, programmation & création, intelligence artificielle & IoT, et activités ludiques autour des sciences et du numérique. Chaque atelier s’adapte au niveau et au contexte du groupe.',
  },
  {
    category: 'ateliers',
    question: 'Comment réserver un atelier ?',
    answer:
      'Choisissez un atelier sur notre site, puis utilisez le formulaire de réservation. Nous vous envoyons ensuite une confirmation avec le détail pédagogique, logistique et tarifaire.',
  },
  {
    category: 'ateliers',
    question: 'Comment se déroule une intervention scolaire ?',
    answer:
      'Nous intervenons en classe ou dans votre établissement avec le matériel pédagogique nécessaire. Nos animateurs adaptent le programme au niveau et à la durée souhaitée.',
  },
  {
    category: 'ateliers',
    question: 'Proposez-vous des ateliers sur mesure ?',
    answer:
      'Oui, nous créons des ateliers personnalisés selon vos objectifs, votre public et les contraintes de votre planning. Contactez-nous pour construire votre projet.',
  },
  {
    category: 'ateliers',
    question: 'Quel est le délai de réservation ?',
    answer:
      'Nous recommandons de réserver au moins 15 jours à l’avance pour garantir la disponibilité des animateurs et du matériel.',
  },
  /*
  {
    category: 'passerelle',
    question: 'Qu’est-ce que Passerelle Jeunesse ?',
    answer:
      'Passerelle Jeunesse est notre pôle d’activités périscolaires et de loisirs éducatifs pour les jeunes. Nous proposons des formules modulables adaptées aux enfants de 6 à 14 ans.',
  },
  {
    category: 'passerelle',
    question: 'Quels services propose Passerelle Jeunesse ?',
    answer:
      'Nous proposons des formules périscolaires, des stages de vacances, et des activités à la carte autour du numérique, de la créativité et de l’écologie. Les programmes sont pensés pour être accessibles et progressifs.',
  },
  {
    category: 'passerelle',
    question: 'Comment s’inscrire à Passerelle Jeunesse ?',
    answer:
      'Remplissez le formulaire de contact en précisant le pôle Passerelle Jeunesse et le format souhaité. Nous vous rappelons pour finaliser l’inscription et adapter l’offre.',
  },
  {
    category: 'passerelle',
    question: 'Les tarifs sont-ils modulables ?',
    answer:
      'Oui, nos tarifs sont indicatifs et modulables selon la formule choisie, le nombre de jours et les ressources familiales. Nous proposons des réductions fratrie et un accompagnement pour les demandes de financement.',
  },
  {
    category: 'passerelle',
    question: 'Les activités sont-elles adaptées au rythme des enfants ?',
    answer:
      'Oui, les sessions sont conçues pour être ludiques, structurées et adaptées aux rythmes scolaires et périscolaires. Nous veillons à proposer des moments calmes et des activités actives.',
  },
  {
    category: 'passerelle',
    question: 'Proposez-vous des stages pendant les vacances ?',
    answer:
      'Oui, nous organisons des stages de vacances sur 5 jours autour de thèmes comme la science, la créativité, le numérique ou la cuisine éducative.',
  },
  {
    category: 'cavalier',
    question: 'Qu’est-ce que Cavalier Studio ?',
    answer:
      'Cavalier Studio est notre pôle Solutions Numériques : sites web, applications, audit IA, formation digitale et accompagnement numérique pour associations, collectivités et PME.',
  },
  {
    category: 'cavalier',
    question: 'Quels types de sites proposez-vous ?',
    answer:
      'Nous réalisons des sites Essentiels, Studio et Signature, avec des offres adaptées aux structures locales, aux établissements et aux projets sur mesure.',
  },
  {
    category: 'cavalier',
    question: 'Proposez-vous des applications mobiles ?',
    answer:
      'Oui, nous développons des applications web et mobiles sur mesure, avec un accompagnement de la conception jusqu’au déploiement.',
  },
  {
    category: 'cavalier',
    question: 'Que contient un audit IA ?',
    answer:
      'L’audit IA identifie les usages pertinents, évalue les besoins techniques et propose une feuille de route pour intégrer l’IA au sein de votre organisation.',
  },
  {
    category: 'cavalier',
    question: 'Comment demander un devis Cavalier Studio ?',
    answer:
      'Utilisez le formulaire de contact en sélectionnant Cavalier Studio ou le service souhaité. Nous vous proposons un devis détaillé sous 48h.',
  },
  {
    category: 'cavalier',
    question: 'Proposez-vous de la maintenance ?',
    answer:
      'Oui, nous proposons des offres de maintenance mensuelle pour les sites et applications, avec suivi, mises à jour et support.',
  },*/
  {
    category: 'paiement',
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer:
      'Nous acceptons les virements bancaires, les paiements en ligne et les chèques pour les structures. Les modalités sont précisées dans le devis.',
  },
  {
    category: 'paiement',
    question: 'Faut-il verser un acompte ?',
    answer:
      'Oui, un acompte de 30 % est généralement demandé pour confirmer une réservation ou un devis supérieur à 500 €.',
  },
  {
    category: 'paiement',
    question: 'Comment sont calculés les frais de déplacement ?',
    answer:
      'Pour les ateliers sur site, les frais de déplacement sont inclus localement. Au-delà, un forfait kilométrique est appliqué selon la distance.',
  },
  {
    category: 'paiement',
    question: 'Peut-on annuler ou modifier une réservation ?',
    answer:
      'Oui, les conditions d’annulation sont précisées dans les CGV. En général, l’annulation est possible jusqu’à 7 jours avant l’intervention.',
  },
  {
    category: 'paiement',
    question: 'Recevons-nous une facture ?',
    answer:
      'Oui, nous envoyons une facture après prestation ou à la signature du devis, selon le mode de paiement et la nature du service.',
  },
  {
    category: 'general',
    question: 'Quels sont vos horaires et votre zone d’intervention ?',
    answer:
      'Nous sommes présents au Luxembourg et intervenons principalement dans le pays. Les horaires sont adaptés selon le format choisi et la disponibilité des équipes.',
  },
  {
    category: 'general',
    question: 'Comment contacter le bon service ?',
    answer:
      'Utilisez le formulaire de contact en précisant le pôle ou le service souhaité. Vous pouvez aussi envoyer un email à contact@ateliers360.fr.',
  },
  {
    category: 'general',
    question: 'Quelles données personnelles sont collectées ?',
    answer:
      'Nous collectons uniquement les données nécessaires au traitement de votre demande et au suivi de la prestation. La gestion des données est expliquée dans notre Politique de confidentialité.',
  },
  {
    category: 'general',
    question: 'Comment sont traitées les données des mineurs ?',
    answer:
      'Pour les mineurs, nous demandons le consentement des parents et nous traitons les informations sensibles avec le plus grand soin, conformément au RGPD.',
  },
];

const faqItemsEn: FAQItem[] = [
  {
    category: 'ateliers',
    question: 'Who is Ateliers 360 for?',
    answer:
      'Ateliers 360 offers educational workshops for children and young people aged 6-18 in science, robotics, coding, AI and digital ecology. We work with schools, associations and families.',
  },
  {
    category: 'ateliers',
    question: 'What types of workshops do you offer?',
    answer:
      'Our workshops cover robotics & automation, programming & creation, artificial intelligence & IoT, and playful educational activities in science and digital culture. Each workshop adapts to the audience and objectives.',
  },
  {
    category: 'ateliers',
    question: 'How do I book a workshop?',
    answer:
      'Select a workshop on our website and complete the booking form. We will send you a confirmation with the educational, logistical and pricing details.',
  },
  {
    category: 'ateliers',
    question: 'Can you deliver workshops in schools?',
    answer:
      'Yes, we can deliver workshops on-site at your school with the necessary educational equipment. Our facilitators tailor the program to your schedule and students.',
  },
  {
    category: 'ateliers',
    question: 'Do you offer custom workshops?',
    answer:
      'Yes, we build tailored workshops based on your goals, audience and timing. Contact us to create a custom project.',
  },
  {
    category: 'ateliers',
    question: 'What is the booking lead time?',
    answer:
      'We recommend booking at least 15 days in advance to ensure facilitator and equipment availability.',
  },
  /*
  {
    category: 'passerelle',
    question: 'What is Passerelle Jeunesse?',
    answer:
      'Passerelle Jeunesse is our after-school and youth leisure pole. We offer flexible formulas, holiday camps and educational activities for children aged 6 to 14.',
  },
  {
    category: 'passerelle',
    question: 'What services does Passerelle Jeunesse provide?',
    answer:
      'We provide after-school programs, holiday camps, and à-la-carte activities focused on digital skills, creativity and sustainability. Programs are designed to be accessible and progressive.',
  },
  {
    category: 'passerelle',
    question: 'How can I enroll in Passerelle Jeunesse?',
    answer:
      'Fill out the contact form and select the Passerelle Jeunesse pole and desired format. We will call you back to finalize the registration and adapt the offer.',
  },
  {
    category: 'passerelle',
    question: 'Are pricing options flexible?',
    answer:
      'Yes, pricing is indicative and flexible depending on the chosen formula, number of days and family resources. We offer sibling discounts and support for funding requests.',
  },
  {
    category: 'passerelle',
    question: 'Are the activities adapted to children’s rhythms?',
    answer:
      'Yes, sessions are designed to be playful, structured and adapted to school and after-school rhythms. We combine calm moments with dynamic activities.',
  },
  {
    category: 'passerelle',
    question: 'Do you offer holiday camps?',
    answer:
      'Yes, we run 5-day holiday camps on themes such as science, creativity, digital culture and educational cooking.',
  },
  {
    category: 'cavalier',
    question: 'What is Cavalier Studio?',
    answer:
      'Cavalier Studio is our digital solutions pole: websites, apps, AI audits, digital training and support for associations, local authorities and SMEs.',
  },
  {
    category: 'cavalier',
    question: 'What website solutions do you offer?',
    answer:
      'We deliver Essential, Studio and Signature websites, with packages adapted to local organizations, schools and tailor-made projects.',
  },
  {
    category: 'cavalier',
    question: 'Do you develop mobile applications?',
    answer:
      'Yes, we build custom web and mobile apps with support from concept to deployment.',
  },
  {
    category: 'cavalier',
    question: 'What does an AI audit include?',
    answer:
      'The AI audit identifies relevant use cases, evaluates technical needs and proposes a roadmap for integrating AI into your organization.',
  },
  {
    category: 'cavalier',
    question: 'How do I request a Cavalier Studio quote?',
    answer:
      'Use the contact form and choose Cavalier Studio or the desired service. We provide a detailed quote within 48 hours.',
  },
  {
    category: 'cavalier',
    question: 'Do you offer maintenance contracts?',
    answer:
      'Yes, we offer monthly maintenance for websites and apps with updates, monitoring and support.',
  },
  {
    category: 'paiement',
    question: 'What payment methods do you accept?',
    answer:
      'We accept bank transfers, online payments, and checks for organizations. Payment terms are detailed in the quote.',
  },*/
  {
    category: 'paiement',
    question: 'Is a deposit required?',
    answer:
      'Yes, a 30% deposit is typically requested to confirm a booking or a quote over €500.',
  },
  {
    category: 'paiement',
    question: 'How are travel fees calculated?',
    answer:
      'For on-site workshops, travel fees are included locally. Beyond that, a mileage fee is applied according to the distance.',
  },
  {
    category: 'paiement',
    question: 'Can I cancel or change a booking?',
    answer:
      'Yes, cancellation conditions are detailed in the terms. Generally, cancellation is possible up to 7 days before the intervention.',
  },
  {
    category: 'paiement',
    question: 'Will I receive an invoice?',
    answer:
      'Yes, we issue an invoice after the service or upon quote acceptance, depending on the payment method and service.',
  },
  {
    category: 'general',
    question: 'What are your working hours and service area?',
    answer:
      'We are based in Luxembourg and mainly operate across the country. Schedules are adapted to the chosen format and team availability.',
  },
  {
    category: 'general',
    question: 'How do I contact the right service?',
    answer:
      'Use the contact form and specify the desired pole or service. You can also email contact@ateliers360.fr.',
  },
  {
    category: 'general',
    question: 'What personal data do you collect?',
    answer:
      'We only collect data needed to process your request and manage the service. Data handling is explained in our Privacy Policy.',
  },
  {
    category: 'general',
    question: 'How is minors’ data handled?',
    answer:
      'For minors, we request parental consent and process sensitive information with care, in compliance with GDPR.',
  },
];

type FAQCategory = 'ateliers' | 'paiement' | 'general';

export default function FAQ({ locale }: { locale: string }) {
  const isEnglish = locale?.startsWith('en');
  const faqItems = isEnglish ? faqItemsEn : faqItemsFr;
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('general');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const categories: Array<{ id: FAQCategory; label: string; color: string }> = [
    {
      id: 'ateliers',
      label: isEnglish ? 'Ateliers 360' : 'Ateliers 360',
      color: 'bg-blue-100 text-blue-900',
    },
    {
      id: 'paiement',
      label: isEnglish ? 'Payment' : 'Paiement',
      color: 'bg-amber-100 text-amber-900',
    },
    {
      id: 'general',
      label: isEnglish ? 'General questions' : 'Questions générales',
      color: 'bg-gray-100 text-gray-900',
    },
  ];

  const filteredFaqs = faqItems.filter((item) => item.category === activeCategory);

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="flex flex-col">
      <section className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 py-16 text-white md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {isEnglish ? 'Frequently Asked Questions' : 'Questions fréquentes'}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-blue-50">
              {isEnglish
                ? 'Your questions about Ateliers 360'
                : 'Vos questions sur Ateliers 360'}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full border-b bg-background py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setActiveCategory(cat.id)}
                className={activeCategory === cat.id ? `${cat.color} text-lg font-semibold` : 'text-base'}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => (
                <Card key={index} className="overflow-hidden border transition-all hover:shadow-md">
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="flex w-full items-center justify-between bg-white px-6 py-4 text-left hover:bg-gray-50"
                  >
                    <span className="text-lg font-semibold text-gray-900">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-600 transition-transform ${
                        expandedItems.has(index) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedItems.has(index) && (
                    <CardContent className="border-t bg-gray-50 px-6 py-4">
                      <p className="leading-relaxed text-gray-700">{item.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))
            ) : (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-600">
                <p>{isEnglish ? 'No questions available for this category.' : 'Aucune question disponible pour cette catégorie.'}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEnglish ? 'Didn’t find the answer?' : 'Vous n’avez pas trouvé la réponse ?'}
            </h2>
            <p className="mt-4 text-gray-700">
              {isEnglish
                ? 'Our team is ready to help. Feel free to contact us directly.'
                : 'Notre équipe est là pour vous aider. N’hésitez pas à nous contacter directement.'}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => window.location.href = `${isEnglish ? '/en/contact' : '/fr/contact'}`}>
                {isEnglish ? 'Contact us' : 'Nous contacter'}
              </Button>
              <Button variant="outline" onClick={() => window.location.href = 'mailto:contact@ateliers360.fr'}>
                {isEnglish ? 'Send an email' : 'Envoyer un email'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
