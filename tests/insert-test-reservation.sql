-- Insérer une réservation de test pour tester Stripe Checkout
INSERT INTO reservations (
  atelier_id,
  nom,
  email,
  etablissement,
  adresse,
  participants_count,
  date_atelier,
  message,
  status,
  created_at,
  updated_at
) VALUES (
  1, -- ID du premier atelier
  'Nathan Imogo Test',
  'nathan@imulabs.fr',
  'ImuLabs HQ',
  '123 Rue Test, Paris',
  15,
  '2025-12-22',
  'Test E2E complet du flow réservation → Stripe → Email',
  'pending',
  NOW(),
  NOW()
) RETURNING *;
