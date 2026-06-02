export const metadata = {
  title: 'En attente de validation - Ateliers 360',
};

export default function WaitingValidationPage() {
  return (
    <div style={{ maxWidth: 760, margin: '32px auto', padding: 20 }}>
      <h1>Votre compte est en attente de validation</h1>
      <p>
        Merci pour votre inscription. Un administrateur va vérifier votre
        demande et valider votre compte. Vous recevrez un email dès que la
        validation sera effectuée.
      </p>
      <p style={{ marginTop: 12 }}>
        Si vous avez besoin d'aide, contactez-nous à{' '}
        <a href="mailto:contact@ateliers360.fr">contact@ateliers360.fr</a>.
      </p>
    </div>
  );
}
