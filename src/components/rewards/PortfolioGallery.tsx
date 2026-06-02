import React from 'react';

export default function PortfolioGallery({
  projects,
}: {
  projects?: Array<any>;
}) {
  return (
    <div className="portfolio-gallery">
      {(projects || []).length === 0 ? (
        <p>Aucun projet pour l'instant.</p>
      ) : (
        <ul>
          {projects!.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
