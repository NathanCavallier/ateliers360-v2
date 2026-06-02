import React from 'react';
import { AccountType } from '../../types-accounts';

type Props = {
  value?: AccountType;
  onChange: (type: AccountType) => void;
};

const OPTIONS: { key: AccountType; label: string; description: string }[] = [
  {
    key: AccountType.Family,
    label: 'Famille',
    description: 'Inscription parent / famille',
  },
  {
    key: AccountType.Establishment,
    label: 'Établissement',
    description: 'École / Collège / Lycée',
  },
  {
    key: AccountType.Center,
    label: 'Centre de loisirs',
    description: 'ALSH, MJC, association',
  },
  {
    key: AccountType.Animator,
    label: 'Animateur',
    description: 'Intervenant Ateliers 360',
  },
  {
    key: AccountType.Learner,
    label: 'Apprenant',
    description: 'Élève / étudiant',
  },
  {
    key: AccountType.Other,
    label: 'Autre',
    description: 'Autre profil / situation particulière',
  },
];

export default function AccountTypePicker({ value, onChange }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
      }}
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onChange(opt.key)}
          aria-pressed={value === opt.key}
          style={{
            border:
              value === opt.key ? '2px solid #2563eb' : '1px solid #e5e7eb',
            padding: 12,
            borderRadius: 8,
            textAlign: 'left',
            background: value === opt.key ? '#eff6ff' : '#fff',
            cursor: 'pointer',
          }}
        >
          <div style={{ fontWeight: 600 }}>{opt.label}</div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>
            {opt.description}
          </div>
        </button>
      ))}
    </div>
  );
}
