'use client';
import React, { useState } from 'react';
import { CheckCircle2, CircleDashed, Loader2, XCircle } from 'lucide-react';

export default function QRVerifier() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function verify() {
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/rewards/verify?token=${encodeURIComponent(token)}`
      );
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || 'Jeton invalide ou introuvable');
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err?.message || 'Erreur réseau');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Entrez le code QR ou token"
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="button"
          onClick={verify}
          disabled={loading || !token.trim()}
          className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Vérifier'}
        </button>
      </div>

      {error ? (
        <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive-foreground">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      ) : null}

      {result ? (
        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="h-5 w-5" /> Jeton vérifié
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div>
              <span className="font-semibold">Étudiant :</span>{' '}
              {result.student?.name || result.student_id || 'Inconnu'}
            </div>
            <div>
              <span className="font-semibold">Atelier :</span>{' '}
              {result.workshop_id ? `#${result.workshop_id}` : 'Non renseigné'}
            </div>
            <div>
              <span className="font-semibold">Émise le :</span>{' '}
              {result.issued_at || 'Inconnue'}
            </div>
            {result.pdf_url ? (
              <div>
                <a
                  href={result.pdf_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  Ouvrir l’attestation PDF
                </a>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {!result && !error && !loading ? (
        <div className="rounded-3xl border border-border bg-muted p-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CircleDashed className="h-5 w-5" />
            Saisissez un token pour vérifier une attestation.
          </div>
        </div>
      ) : null}
    </div>
  );
}
