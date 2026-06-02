import { render, screen } from '@testing-library/react';
import AllergyBadges from '../../src/components/famille/AllergyBadges';

describe('AllergyBadges', () => {
  test('renders no allergy badge when none provided', () => {
    render(<AllergyBadges />);
    expect(screen.getByText('Aucune allergie')).toBeInTheDocument();
  });

  test('renders allergy pills from list and free-text', () => {
    render(
      <AllergyBadges
        allergies={['gluten', 'lait']}
        otherAllergies="arachides, latex"
      />
    );

    expect(screen.getByText('gluten')).toBeInTheDocument();
    expect(screen.getByText('lait')).toBeInTheDocument();
    expect(screen.getByText('arachides')).toBeInTheDocument();
    expect(screen.getByText('latex')).toBeInTheDocument();
  });
});
