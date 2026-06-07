'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FAQItem {
  category: 'ateliers' | 'passerelle' | 'general';
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  // ===== ATELIERS 360 =====
  {
    category: 'ateliers',
    question: 'Quel est le public visé par Ateliers 360 ?',
    answer:
      'Ateliers 360 propose des ateliers éducatifs pour les enfants et jeunes (6-25 ans) intéressés par la science, la technologie, la robotique et la programmation. Nos ateliers s\'adressent aux écoles, aux MJC, aux associations et aux familles.',
  },
  {
    category: 'ateliers',
    question: 'Quels types d\'ateliers proposez-vous ?',
    answer:
      'Nous proposons 4 pôles principaux : (1) Robotique & Automatismes, (2) Programmation & Création, (3) IA & IoT, (4) Activités ludiques et éducatives (escapes games, quiz, narratifs, etc.). Chaque pôle propose plusieurs ateliers adaptés aux niveaux et intérêts.',
  },
  {
    category: 'ateliers',
    question: 'Quels sont les tarifs des ateliers ?',
    answer:
      'Les tarifs varient selon la durée et le type d\'atelier. Consultez notre page Tarifs pour une liste complète, ou contactez-nous directement. Des réductions de groupe et des forfaits annuels sont disponibles.',
  },
  {
    category: 'ateliers',
    question: 'Comment s\'inscrire à un atelier ?',
    answer:
      'Vous pouvez vous inscrire directement sur notre site en cliquant sur l\'atelier qui vous intéresse, puis en remplissant le formulaire d\'inscription. Une confirmation sera envoyée par email avec tous les détails pratiques.',
  },
  {
    category: 'ateliers',
    question: 'Proposez-vous des ateliers pour les écoles ?',
    answer:
      'Oui ! Nous proposons des ateliers scolaires adaptés aux programmes éducatifs. Les écoles peuvent nous contacter directement via la section "Pour les écoles" ou en utilisant le formulaire de contact.',
  },
  {
    category: 'ateliers',
    question: 'Peut-on organiser un atelier personnalisé ?',
    answer:
      'Absolument ! Nous proposons des ateliers sur-mesure adaptés à vos besoins spécifiques (groupe, niveau, durée, thème). Contactez-nous pour discuter de votre projet.',
  },
  {
    category: 'ateliers',
    question: 'Quelle est la durée habituelle d\'un atelier ?',
    answer:
      'Les ateliers varient généralement de 2 à 4 heures pour une session, ou plusieurs semaines pour des programmes complets. Consultez la description de chaque atelier pour les détails spécifiques.',
  },
  {
    category: 'ateliers',
    question: 'Quel est le nombre de participants par atelier ?',
    answer:
      'Le nombre de participants varie selon l\'atelier (généralement 6-15 enfants). Chaque groupe est supervisé par au moins un animateur pour garantir la qualité et la sécurité.',
  },

  // ===== PASSERELLE JEUNESSE =====
  {
    category: 'passerelle',
    question: 'Qu\'est-ce que Passerelle Jeunesse ?',
    answer:
      'Passerelle Jeunesse est un pôle d\'accompagnement spécialisé dans le soutien à la mobilité des jeunes. Nous proposons un accompagnement personnalisé pour les trajets vers des lieux d\'activités, d\'études ou de stage. À terme, nous développerons aussi des ateliers jeunesse spécifiques et des services d\'accueil et d\'orientation.',
  },
  {
    category: 'passerelle',
    question: 'Quels services propose Passerelle Jeunesse actuellement ?',
    answer:
      'Actuellement, Passerelle Jeunesse propose : (1) Accompagnement mobilité (trajets locaux et nationaux), (2) Support logistique, (3) Aide à l\'orientation. À terme (2026-2027), nous ajouterons des ateliers jeunesse, un service d\'accueil et d\'escape games éducatifs.',
  },
  {
    category: 'passerelle',
    question: 'Qui peut bénéficier de Passerelle Jeunesse ?',
    answer:
      'Passerelle Jeunesse s\'adresse aux jeunes de 6 à 25 ans, en particulier : ceux qui ont des difficultés de mobilité, les jeunes isolés socialement, ceux en insertion professionnelle, les jeunes intéressés par des activités à mobilité importante. L\'accompagnement s\'adapte à chaque situation.',
  },
  {
    category: 'passerelle',
    question: 'Comment demander une mission Passerelle Jeunesse ?',
    answer:
      'Vous pouvez faire une demande directement via notre formulaire "Demander une mission Passerelle Jeunesse". Remplissez les informations du jeune, vos coordonnées et les détails de la demande. Nous vous recontacterons dans les 48 heures pour confirmer et finaliser l\'accompagnement.',
  },
  {
    category: 'passerelle',
    question: 'Quels sont les tarifs de Passerelle Jeunesse ?',
    answer:
      'Les tarifs dépendent de la durée de l\'accompagnement, du type de trajet et des services additionnels. Un devis personnalisé est fourni après réception de votre demande. Des tarifs réduits sont proposés pour les accompagnements réguliers.',
  },
  {
    category: 'passerelle',
    question: 'Y a-t-il des frais supplémentaires (transport, repas) ?',
    answer:
      'Les tarifs de base incluent l\'accompagnement. Les frais de transport (carburant, péage) et les repas sont généralement à prévoir en fonction du trajet. Une estimation complète est détaillée dans le devis.',
  },
  {
    category: 'passerelle',
    question: 'Peut-on annuler ou modifier une mission ?',
    answer:
      'Oui, les annulations et modifications sont possibles. Les conditions d\'annulation et de remboursement sont détaillées dans les Conditions Générales et le contrat de mission. Contactez-nous directement pour toute demande.',
  },
  {
    category: 'passerelle',
    question: 'Comment fonctionne le paiement pour Passerelle Jeunesse ?',
    answer:
      'Les paiements se font en deux étapes : (1) Un acompte de sécurité (20% du tarif) au moment de la confirmation, (2) Le reste à la fin de l\'accompagnement. Nous acceptons les virements bancaires et les paiements en ligne (Stripe).',
  },
  {
    category: 'passerelle',
    question: 'Passerelle Jeunesse travaille-t-elle avec les structures locales ?',
    answer:
      'Oui ! Nous avons des partenariats avec des mairies, MJC, associations et structures jeunesse locales (région Moselle). Consultez notre page Partenaires ou contactez-nous pour connaître les ressources disponibles dans votre zone.',
  },

  // ===== GENERAL =====
  {
    category: 'general',
    question: 'Quelle est la différence entre Ateliers 360 et Passerelle Jeunesse ?',
    answer:
      'Ateliers 360 propose des ateliers éducatifs (robotique, programmation, IA) dans nos locaux ou directement à l\'école. Passerelle Jeunesse propose un accompagnement personnalisé à la mobilité des jeunes. Les deux pôles sont complémentaires et font partie du même écosystème éducatif et jeunesse.',
  },
  {
    category: 'general',
    question: 'Comment puis-je contacter Ateliers 360 ?',
    answer:
      'Vous pouvez nous contacter via : (1) Le formulaire de contact sur le site, (2) L\'email : contact@ateliers360.fr, (3) Le téléphone : [numéro à ajouter], (4) Les réseaux sociaux (Facebook, Instagram). Nous répondons généralement dans les 24 heures.',
  },
  {
    category: 'general',
    question: 'Ateliers 360 propose-t-il un accompagnement pour les écoles ?',
    answer:
      'Oui ! Nous proposons des solutions adaptées aux écoles : ateliers scolaires, interventions en classe, formations pour les enseignants, projets multidisciplinaires. Consultez la section "Pour les écoles" ou contactez notre équipe pédagogique.',
  },
  {
    category: 'general',
    question: 'Proposez-vous des formations pour les animateurs ?',
    answer:
      'Oui, nous proposons des formations régulières pour les animateurs et intervenants. Contactez-nous pour connaître le calendrier des formations et les modalités de participation.',
  },
  {
    category: 'general',
    question: 'Comment garantissez-vous la sécurité et le respect des enfants ?',
    answer:
      'La sécurité est notre priorité absolue. Tous nos animateurs et accompagnateurs ont une assurance responsabilité civile et respectent les protocoles de sécurité stricts. Une autorisation parentale est requise pour tous les jeunes mineurs. Consultez notre page Mentions légales et Politique de confidentialité pour plus de détails.',
  },
  {
    category: 'general',
    question: 'Comment gérez-vous les données personnelles et médicales ?',
    answer:
      'Nous prenons le RGPD très au sérieux. Toutes les données personnelles et médicales sont stockées de manière sécurisée et utilisées uniquement pour les besoins de l\'accompagnement ou de l\'atelier. Consultez notre Politique de confidentialité pour plus de détails ou contactez-nous.',
  },
  {
    category: 'general',
    question: 'Quel est votre engagement environnemental ?',
    answer:
      'Ateliers 360 et Passerelle Jeunesse s\'engagent pour une démarche durable : matériels réutilisables, numérique responsable, trajets optimisés pour réduire l\'empreinte carbone. Nous sensibilisons aussi les jeunes aux enjeux écologiques à travers certains de nos ateliers.',
  },
];

export default function FAQ({ locale }: { locale: string }) {
  const [activeCategory, setActiveCategory] = useState<'ateliers' | 'passerelle' | 'general'>('general');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const categories = [
    { id: 'ateliers', label: 'Ateliers 360', color: 'bg-blue-100 text-blue-900' },
    { id: 'passerelle', label: 'Passerelle Jeunesse', color: 'bg-emerald-100 text-emerald-900' },
    { id: 'general', label: 'Questions générales', color: 'bg-gray-100 text-gray-900' },
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
      {/* Header Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 py-16 text-white md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Frequently Asked Questions</h1>
            <p className="mt-5 text-lg leading-relaxed text-blue-50">
              Vos questions sur Ateliers 360 et Passerelle Jeunesse.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="w-full border-b bg-background py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setActiveCategory(cat.id as 'ateliers' | 'passerelle' | 'general')}
                className={activeCategory === cat.id ? `${cat.color} text-lg font-semibold` : 'text-base'}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
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
                <p>Aucune question disponible pour cette catégorie.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gray-100 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900">Vous n'avez pas trouvé la réponse ?</h2>
            <p className="mt-4 text-gray-700">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter directement.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Nous contacter
              </Button>
              <Button variant="outline">
                Envoyer un email
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
