'use server';

/**
 * @fileOverview A flow to generate workshop images using AI from a text description.
 *
 * - generateWorkshopImage - A function that handles the image generation process.
 * - GenerateWorkshopImageInput - The input type for the generateWorkshopImage function.
 * - GenerateWorkshopImageOutput - The return type for the generateWorkshopImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWorkshopImageInputSchema = z.object({
  description: z.string().describe('The description of the workshop for image generation.'),
});
export type GenerateWorkshopImageInput = z.infer<typeof GenerateWorkshopImageInputSchema>;

const GenerateWorkshopImageOutputSchema = z.object({
  imageUrl: z.string().describe('The generated image URL as a data URI.'),
});
export type GenerateWorkshopImageOutput = z.infer<typeof GenerateWorkshopImageOutputSchema>;

export async function generateWorkshopImage(input: GenerateWorkshopImageInput): Promise<GenerateWorkshopImageOutput> {
  return generateWorkshopImageFlow(input);
}

const generateWorkshopImagePrompt = ai.definePrompt({
  name: 'generateWorkshopImagePrompt',
  input: {schema: GenerateWorkshopImageInputSchema},
  output: {schema: GenerateWorkshopImageOutputSchema},
  prompt: `Generate a professional-looking image for a workshop with the following description: {{{description}}}.  The image should be suitable for use on a website or in marketing materials. Return the image as a data URI. The image should depict children smiling while coding/manipulating robots. Focus on real kids and real activities.`,
});

const generateWorkshopImageFlow = ai.defineFlow(
  {
    name: 'generateWorkshopImageFlow',
    inputSchema: GenerateWorkshopImageInputSchema,
    outputSchema: GenerateWorkshopImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.description,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image.');
    }

    return {imageUrl: media.url};
  }
);
