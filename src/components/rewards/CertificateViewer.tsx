import React from 'react';

export default function CertificateViewer({ pdfUrl }: { pdfUrl?: string }) {
  return (
    <div className="certificate-viewer">
      <p>Visionneuse d'attestation (PDF) — URL: {pdfUrl || '—'}</p>
    </div>
  );
}
