'use client';
import React from 'react';

export default function BadgeCard({
  name,
  description,
  image,
}: {
  name: string;
  description?: string;
  image?: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
      {image ? (
        <img
          src={image}
          alt={name}
          className="mb-4 h-16 w-16 rounded-2xl object-cover"
        />
      ) : (
        <div className="mb-4 h-16 w-16 rounded-2xl bg-muted" />
      )}
      <h4 className="text-lg font-semibold">{name}</h4>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
