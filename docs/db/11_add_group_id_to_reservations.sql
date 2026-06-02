-- Migration: add group_id to reservations to support batch payment and grouped reservations

ALTER TABLE reservations
ADD COLUMN IF NOT EXISTS group_id TEXT;

CREATE INDEX IF NOT EXISTS idx_reservations_group_id ON reservations(group_id);
