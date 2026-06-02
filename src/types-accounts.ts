// Types partagés pour la gestion des comptes et profils
export enum AccountType {
  Family = 'family',
  Establishment = 'establishment',
  Center = 'center',
  Animator = 'animator',
  Learner = 'learner',
  Student = 'student',
  Other = 'other',
}

export interface FamilyProfile {
  id?: string;
  account_type: AccountType;
  email?: string;
  phone?: string | null;
  created_at?: string;
  is_verified?: boolean;
}

export interface Child {
  id?: string;
  family_id: string;
  first_name: string;
  last_name?: string | null;
  birthdate?: string | null;
  school_id?: string | null;
  notes?: string | null;
  created_at?: string;
}

export type ConsentType =
  | 'photos_internal'
  | 'photos_public'
  | 'videos_internal'
  | 'videos_public'
  | 'pedagogical_data'
  | 'newsletter';

export interface AuthorizationConsent {
  id?: string;
  child_id: string;
  consent: ConsentType;
  granted: boolean;
  granted_at?: string | null;
  expires_at?: string | null;
}
