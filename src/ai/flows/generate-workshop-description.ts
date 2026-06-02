'use server';

/**
 * @fileOverview AI flow to generate workshop descriptions from a basic outline.
 *
 * - generateWorkshopDescription - A function that generates a workshop description.
 * - GenerateWorkshopDescriptionInput - The input type for the generateWorkshopDescription function.
 * - GenerateWorkshopDescriptionOutput - The return type for the generateWorkshopDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWorkshopDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the workshop.'),
  targetAudience: z.string().describe('The target audience for the workshop (e.g., ages 8-12).'),
  duration: z.string().describe('The duration of the workshop (e.g., 2 hours).'),
  descriptionOutline: z.string().describe('A brief outline of the workshop content.'),
  learningObjectives: z.string().describe('A list of the learning objectives for the workshop.'),
});
export type GenerateWorkshopDescriptionInput = z.infer<typeof GenerateWorkshopDescriptionInputSchema>;

const GenerateWorkshopDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling and engaging description of the workshop.'),
});
export type GenerateWorkshopDescriptionOutput = z.infer<typeof GenerateWorkshopDescriptionOutputSchema>;

export async function generateWorkshopDescription(input: GenerateWorkshopDescriptionInput): Promise<GenerateWorkshopDescriptionOutput> {
  return generateWorkshopDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWorkshopDescriptionPrompt',
  input: {schema: GenerateWorkshopDescriptionInputSchema},
  output: {schema: GenerateWorkshopDescriptionOutputSchema},
  prompt: `You are an expert educational content writer. You will generate a compelling and engaging workshop description based on the provided outline and learning objectives.

Workshop Title: {{{title}}}
Target Audience: {{{targetAudience}}}
Duration: {{{duration}}}

Description Outline: {{{descriptionOutline}}}

Learning Objectives: {{{learningObjectives}}}

Write a detailed and engaging workshop description. `,
});

const generateWorkshopDescriptionFlow = ai.defineFlow(
  {
    name: 'generateWorkshopDescriptionFlow',
    inputSchema: GenerateWorkshopDescriptionInputSchema,
    outputSchema: GenerateWorkshopDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
