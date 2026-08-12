import { ReactNode } from 'react';
import type { ImagePlaceholder } from './placeholder-images';

export enum CategoriesColors {
  all = 'default',
  sciences = '#0097b2',
  numeriqueCode = '#4910bc',
  robotiqueIa = '#0a714e',
  numeriqueResponsable = '#e96b1f',
  ecologieVie = '#4ca626',
  espaceAeronautique = '#004aad',
}

export type Workshop = {
  titre: string;
  public_cible: string;
  duree_heures: number;
  tarif_eur: number;
  id: string | number;
  slug: string;
  title: string;
  type?: 'workshop' | 'module' | 'pack' | null;
  shortDescription: string;
  longDescription: string;
  description: string;
  targetAudience: string;
  ageGroup: string;
  duration: string;
  learningObjectives: string[];
  objectives: string[];
  image: ImagePlaceholder;
  category: string;
  categoryColor: CategoriesColors | string;
  discipline: string;
  price: number;
  format: string;
  materials: string;
  tags?: string[];
};

// Supabase models
export type WorkshopDB = {
  id: number;
  slug: string;
  titre: string;
  description: string;
  objectifs: string[];
  public_cible: string;
  duree_heures: number;
  tarif_eur: number;
  materiel: string;
  title?: string;
  shortdescription?: string | null;
  longdescription?: string | null;
  learningobjectives?: string[] | null;
  targetaudience?: string | null;
  agegroup?: string | null;
  duration?: string | null;
  price?: number | null;
  materials?: string | null;
  category?: string | null;
  categorycolor?: string | null;
  discipline?: string | null;
  format?: string | null;
  categorie?: string | null;
  type?: 'workshop' | 'module' | 'pack' | null;
  sequence_order?: number | null;
  tags?: string[] | null;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
};

export type Reservation = {
  id: number;
  atelier_id: number;
  email: string;
  nom: string;
  etablissement?: string | null;
  adresse?: string | null;
  participants_count: number;
  date_atelier: string; // YYYY-MM-DD
  status: 'pending' | 'confirmed' | 'paid' | 'completed';
  stripe_session_id?: string | null;
  group_id?: string | null; // Optionnel: ID du groupe pour les réservations multiples
  created_at: string;
  updated_at: string;
};

// Type pour un groupe de réservations (plusieurs ateliers/dates)
export type ReservationGroup = {
  id: string;
  email: string;
  nom: string;
  etablissement?: string | null;
  adresse?: string | null;
  participants_count: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'paid' | 'completed';
  stripe_session_id?: string | null;
  reservations: Reservation[]; // Les réservations individuelles du groupe
  created_at: string;
  updated_at: string;
};

// Type pour les données du formulaire de réservation multiple
export type MultiReservationFormData = {
  atelier_ids: number[]; // Plusieurs ateliers
  dates: string[]; // Plusieurs dates (YYYY-MM-DD)
  email: string;
  nom: string;
  etablissement?: string;
  adresse?: string;
  participants_count: number;
  message?: string;
  cgv_accepted: boolean;
};

export type BlogArticle = {
  id: number;
  slug: string;
  titre: string;
  excerpt?: string | null;
  contenu: string;
  category?: string | null;
  tags?: string[] | null;
  author?: string | null;
  image_url?: string | null;
  read_time?: number | null; // en minutes
  published_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type Event = {
  id: number;
  atelier_id: number;
  date_event: string; // YYYY-MM-DD
  heure_debut: string; // HH:MM
  heure_fin: string; // HH:MM
  places_disponibles: number;
  adresse?: string | null;
  created_at: string;
};

export type Group = {
  id: number;
  name: string;
  level?: string | null;
  age_range?: string | null;
  establishment?: string | null;
  main_theme?: string | null;
  created_at: string;
  updated_at: string;
};

export type GroupMember = {
  id: number;
  group_id: number;
  user_id: string; // uuid
  role: 'apprenant' | 'animateur' | 'admin';
  joined_at: string;
};

export type GroupSession = {
  id: number;
  group_id: number;
  title?: string | null;
  description?: string | null;
  date_session: string; // YYYY-MM-DD
  start_time: string; // HH:MM:SS
  end_time: string; // HH:MM:SS
  location?: string | null;
  created_at: string;
};

export type Attendance = {
  id: number;
  session_id: number;
  member_id: number;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string | null;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  account_type?:
    | 'family'
    | 'establishment'
    | 'center'
    | 'animator'
    | 'learner'
    | 'student'
    | 'other'
    | null;
  is_verified?: boolean;
  metadata?: Record<string, any> | null;
  updated_at: string;
};

export type GroupResource = {
  id: number;
  group_id: number;
  title: string;
  file_url: string;
  file_type: 'file' | 'link';
  uploaded_by: string | null;
  created_at: string;
};

export type Evaluation = {
  id: number;
  member_id: number;
  author_id: string | null;
  content: string;
  type: 'observation' | 'feedback' | 'grade';
  created_at: string;
};

export type Badge = {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  image_url?: string | null;
  competency_ids?: number[] | null;
  level?: number | null;
  created_by?: string | null;
  metadata?: Record<string, any> | null;
  created_at: string;
  updated_at: string;
};

export type BadgeIssuance = {
  id: number;
  badge_id: number;
  student_id: string;
  issued_by: string | null;
  issued_at: string;
  evidence?: Record<string, any> | null;
  exported_formats?: string[] | null;
  created_at: string;
};

export type Attestation = {
  id: number;
  student_id: string;
  workshop_id: number;
  issued_at: string;
  pdf_url: string;
  qr_token: string;
  signed_by?: string | null;
  created_at: string;
};

// Project/Fil Rouge types
export type Project = {
  id: number;
  group_id: number;
  title: string;
  description?: string | null;
  status: 'active' | 'archived';
  created_at: string;
};
export type ProjectStep = {
  id: number;
  project_id: number;
  title: string;
  description?: string | null;
  step_order: number;
  created_at: string;
};

export type ProjectDeliverable = {
  id: number;
  step_id: number;
  member_id: number;
  content?: string | null;
  file_url?: string | null;
  created_at: string;
};

export type Testimonial = {
  id: number;
  workshop_id?: number | null;
  author_name: string;
  author_role: string; // e.g., "Enseignant", "Parent", "Élève"
  author_establishment?: string | null; // e.g., school name
  quote: string;
  content?: string | null;
  image_url?: string | null; // avatar or photo
  video_url?: string | null; // testimonial video
  rating?: number | null; // 1-5 stars
  published: boolean;
  source?: 'form' | 'email' | 'direct_entry' | null;
  created_at: string;
  updated_at: string;
};

export type ImageConsentForm = {
  id: number;
  testimonial_id?: number | null;
  full_name: string;
  email: string;
  phone?: string | null;
  relationship_to_minor: string; // 'parent', 'guardian', 'teacher', 'other'
  minor_full_name: string;
  minor_age: number;
  usage_scope: 'website' | 'social_media' | 'advertising' | 'all';
  usage_duration: 'permanent' | '1_year' | '2_years' | 'until_withdrawal' | null;
  allows_photo: boolean;
  allows_video: boolean;
  allows_name_publication: boolean;
  signature_date: string; // ISO date
  signature_method: 'digital' | 'email_confirmation' | 'physical_form' | null;
  ip_address?: string | null;
  user_agent?: string | null;
  status: 'pending' | 'accepted' | 'declined' | 'revoked';
  notes?: string | null;
  created_at: string;
  updated_at: string;
};

type SupabaseTable<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

// Supabase Database type
export type Database = {
  public: {
    Tables: {
      ateliers: SupabaseTable<
        WorkshopDB,
        Partial<WorkshopDB> & {
          slug: string;
          titre: string;
          description: string;
          public_cible: string;
          objectifs: string[];
        },
        Partial<WorkshopDB>
      >;
      reservations: SupabaseTable<
        Reservation,
        Partial<Reservation> & {
          atelier_id: number;
          email: string;
          nom: string;
          participants_count: number;
          date_atelier: string;
        },
        Partial<Reservation>
      >;
      blog_articles: SupabaseTable<
        BlogArticle,
        Partial<BlogArticle> & { slug: string; titre: string; contenu: string },
        Partial<BlogArticle>
      >;
      events: SupabaseTable<
        Event,
        Partial<Event> & {
          atelier_id: number;
          date_event: string;
          heure_debut: string;
          heure_fin: string;
          places_disponibles: number;
        },
        Partial<Event>
      >;
      groups: SupabaseTable<
        Group,
        Partial<Group> & { name: string },
        Partial<Group>
      >;
      group_members: SupabaseTable<
        GroupMember,
        Partial<GroupMember> & { group_id: number; user_id: string },
        Partial<GroupMember>
      >;
      group_sessions: SupabaseTable<
        GroupSession,
        Partial<GroupSession> & {
          group_id: number;
          date_session: string;
          start_time: string;
          end_time: string;
        },
        Partial<GroupSession>
      >;
      attendance: SupabaseTable<
        Attendance,
        Partial<Attendance> & { session_id: number; member_id: number },
        Partial<Attendance>
      >;
      profiles: SupabaseTable<
        Profile,
        Partial<Profile> & { id: string },
        Partial<Profile>
      >;
      group_resources: SupabaseTable<
        GroupResource,
        Partial<GroupResource> & {
          group_id: number;
          title: string;
          file_url: string;
          file_type: 'file' | 'link';
        },
        Partial<GroupResource>
      >;
      evaluations: SupabaseTable<
        Evaluation,
        Partial<Evaluation> & {
          member_id: number;
          content: string;
          type: 'observation' | 'feedback' | 'grade';
        },
        Partial<Evaluation>
      >;
      projects: SupabaseTable<
        Project,
        Partial<Project> & { group_id: number; title: string },
        Partial<Project>
      >;
      project_steps: SupabaseTable<
        ProjectStep,
        Partial<ProjectStep> & {
          project_id: number;
          title: string;
          step_order: number;
        },
        Partial<ProjectStep>
      >;
      project_deliverables: SupabaseTable<
        ProjectDeliverable,
        Partial<ProjectDeliverable> & { step_id: number; member_id: number },
        Partial<ProjectDeliverable>
      >;
      badges: SupabaseTable<
        Badge,
        Partial<Badge> & { slug: string; name: string },
        Partial<Badge>
      >;
      badge_issuances: SupabaseTable<
        BadgeIssuance,
        Partial<BadgeIssuance> & {
          badge_id: number;
          student_id: string;
          issued_at: string;
        },
        Partial<BadgeIssuance>
      >;
      attestations: SupabaseTable<
        Attestation,
        Partial<Attestation> & {
          student_id: string;
          workshop_id: number;
          issued_at: string;
          pdf_url: string;
          qr_token: string;
        },
        Partial<Attestation>
      >;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
