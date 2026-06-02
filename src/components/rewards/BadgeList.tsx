'use client';
import React from 'react';
import BadgeCard from './BadgeCard';

export default function BadgeList({ badges }: { badges: Array<any> }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {badges.map((b: any) => (
        <BadgeCard
          key={b.id || b.slug}
          name={b.name}
          description={b.description}
          image={b.image_url}
        />
      ))}
    </div>
  );
}
