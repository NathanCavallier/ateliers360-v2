import { render, screen } from '@testing-library/react';
import EnfantCard from '../../src/components/famille/EnfantCard';

describe('EnfantCard', () => {
  test('renders child card with basic badges and action links', () => {
    const child = {
      id: 'child-id',
      first_name: 'Test',
      last_name: 'User',
      birthdate: '2018-01-01',
      other_allergies: 'gluten',
      pai_required: true,
    };

    render(
      <EnfantCard
        child={child}
        locale="fr"
        consentsCount={2}
        grantedCount={1}
      />
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Profil complet')).toBeInTheDocument();
    expect(screen.getByText('Infos santé à compléter')).toBeInTheDocument();
    expect(screen.getByText('1/2 validées')).toBeInTheDocument();
    expect(screen.getByText('PAI requis')).toBeInTheDocument();
    expect(screen.getByText('Allergies')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Autorisations' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Éditer' })).toBeInTheDocument();
  });
});
