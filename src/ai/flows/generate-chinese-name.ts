// use server'
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating Chinese names based on a prompt.
 *
 * - generateChineseName - A function that triggers the Chinese name generation flow.
 * - GenerateChineseNameInput - The input type for the generateChineseName function.
 * - GenerateChineseNameOutput - The return type for the generateChineseName function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateChineseNameInputSchema = z.object({
  prompt: z
    .string()
    .max(100)
    .describe(
      'A prompt to guide the Chinese name generation. Limited to 100 characters.'
    ),
});
export type GenerateChineseNameInput = z.infer<
  typeof GenerateChineseNameInputSchema
>;

const GenerateChineseNameOutputSchema = z.object({
  names: z.array(z.string()).describe('An array of generated Chinese names.'),
});
export type GenerateChineseNameOutput = z.infer<
  typeof GenerateChineseNameOutputSchema
>;

export async function generateChineseName(
  input: GenerateChineseNameInput
): Promise<GenerateChineseNameOutput> {
  return generateChineseNameFlow(input);
}

const generateChineseNamePrompt = ai.definePrompt({
  name: 'generateChineseNamePrompt',
  input: {
    schema: z.object({
      prompt: z
        .string()
        .max(100)
        .describe(
          'A prompt to guide the Chinese name generation. Limited to 100 characters.'
        ),
    }),
  },
  output: {
    schema: z
      .object({
        names: z
          .array(z.string())
          .describe('An array of generated Chinese names.'),
      })
      .describe('An array of possible names that fit the description'),
  },
  prompt: `You are a Chinese name expert. Generate Chinese names based on the following prompt: {{{prompt}}}. Return an array of 3 names.`,
});

const generateChineseNameFlow = ai.defineFlow<
  typeof GenerateChineseNameInputSchema,
  typeof GenerateChineseNameOutputSchema
>(
  {
    name: 'generateChineseNameFlow',
    inputSchema: GenerateChineseNameInputSchema,
    outputSchema: GenerateChineseNameOutputSchema,
  },
  async input => {
    const {output} = await generateChineseNamePrompt(input);
    return output!;
  }
);
