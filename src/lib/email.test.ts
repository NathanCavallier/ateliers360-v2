import { describe, expect, it } from 'vitest';
import { buildReservationSummarySections } from './email';

describe('buildReservationSummarySections', () => {
  it('formats a batch reservation summary with workshop details and client information', () => {
    const result = buildReservationSummarySections([
      {
        workshopTitle: 'Robotique ludique',
        date: '20 juillet 2026',
        participants: 12,
        nom: 'Camille Martin',
        email: 'camille@example.com',
        etablissement: 'École des étoiles',
        adresse: '12 rue des Lilas',
      },
      {
        workshopTitle: 'Code créatif',
        date: '22 juillet 2026',
        participants: 8,
        nom: 'Camille Martin',
        email: 'camille@example.com',
        etablissement: 'École des étoiles',
        adresse: '12 rue des Lilas',
      },
    ]);

    expect(result.subject).toContain('2 atelier');
    expect(result.summaryText).toContain('Robotique ludique');
    expect(result.summaryText).toContain('Code créatif');
    expect(result.summaryText).toContain('École des étoiles');
    expect(result.summaryText).toContain('12 rue des Lilas');
  });
});
