'use server';

import { z } from 'zod';
import { sendEmail } from './email';

// Contact Form Action
export async function submitContactForm(prevState: any, formData: FormData) {
  const contactFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    establishment: z.string().min(2, {
      message: 'Please enter your establishment name.',
    }),
    role: z.string().min(2, { message: 'Please enter your role.' }),
    message: z.string().min(10, {
      message: 'Message must be at least 10 characters.',
    }),
  });

  try {
    const validatedFields = contactFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      establishment: formData.get('establishment'),
      role: formData.get('role'),
      message: formData.get('message'),
    });

    if (!validatedFields.success) {
      return {
        type: 'error',
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Please correct the errors and try again.',
      };
    }

    // Send the form data to the server API route
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return {
        type: 'error',
        message: json?.error || "Erreur lors de l'envoi du formulaire.",
      };
    }

    const json = await res.json().catch(() => ({}));

    sendEmail({
      to: 'contact@ateliers360.fr',
      subject: 'New contact form submission',
      html: `<p>You have a new contact form submission:</p>
             <ul>
               <li><strong>Name:</strong> ${validatedFields.data.name}</li>
               <li><strong>Email:</strong> ${validatedFields.data.email}</li>
               <li><strong>Establishment:</strong> ${validatedFields.data.establishment}</li>
               <li><strong>Role:</strong> ${validatedFields.data.role}</li>
               <li><strong>Message:</strong> ${validatedFields.data.message}</li>
             </ul>`,
    });

    return {
      type: 'success',
      message: 'Thank you for your message! We will get back to you shortly.',
      id: json?.id,
    };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}

// Minimal AI workshop generation action + types (stubbed for now)
export type AIFormState =
  | {
      description?: string;
      imageUrl?: string;
      userInput?: Record<string, any> | null;
      error?: string | null;
    }
  | undefined;

export async function generateWorkshopContent(
  state: AIFormState,
  formData: FormData
): Promise<AIFormState> {
  // Minimal stub: return some echoed values. Replace with real AI integration later.
  try {
    const title = String(formData.get('title') || 'Atelier AI');
    const duration = String(formData.get('duration') || '2 heures');
    const targetAudience = String(formData.get('targetAudience') || 'Général');
    const descriptionOutline = String(formData.get('descriptionOutline') || '');
    const learningObjectives = String(formData.get('learningObjectives') || '');

    return {
      description: `Généré pour: ${title}\nDurée: ${duration}\nPublic: ${targetAudience}\n\n${descriptionOutline}`,
      imageUrl: '',
      userInput: {
        title,
        duration,
        targetAudience,
        learningObjectives,
      },
      error: null,
    };
  } catch (e: any) {
    return { error: e?.message || 'Erreur génération' };
  }
}
