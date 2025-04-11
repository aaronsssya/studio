// 'use server';

/**
 * @fileOverview A flow for generating English names based on a prompt.
 *
 * - generateEnglishName - A function that handles the English name generation process.
 * - GenerateEnglishNameInput - The input type for the generateEnglishName function.
 * - GenerateEnglishNameOutput - The return type for the generateEnglishName function.
 */

'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateEnglishNameInputSchema = z.object({
  prompt: z.string().describe('A prompt to generate English names from.'),
});
export type GenerateEnglishNameInput = z.infer<typeof GenerateEnglishNameInputSchema>;

const GenerateEnglishNameOutputSchema = z.object({
  names: z.array(z.string()).describe('An array of generated English names.'),
});
export type GenerateEnglishNameOutput = z.infer<typeof GenerateEnglishNameOutputSchema>;

export async function generateEnglishName(input: GenerateEnglishNameInput): Promise<GenerateEnglishNameOutput> {
  return generateEnglishNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEnglishNamePrompt',
  input: {
    schema: z.object({
      prompt: z.string().describe('A prompt to generate English names from.'),
    }),
  },
  output: {
    schema: z.object({
      names: z.array(z.string()).describe('An array of generated English names.'),
    }),
  },
  prompt: `You are an expert name generator, skilled in creating creative and appropriate English names based on a provided prompt.\n\nGenerate a list of English names based on the following prompt: {{{prompt}}}. Return an array of names.`,
});

const generateEnglishNameFlow = ai.defineFlow<
  typeof GenerateEnglishNameInputSchema,
  typeof GenerateEnglishNameOutputSchema
>(
  {
    name: 'generateEnglishNameFlow',
    inputSchema: GenerateEnglishNameInputSchema,
    outputSchema: GenerateEnglishNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
