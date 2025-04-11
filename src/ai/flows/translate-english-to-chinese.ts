'use server';
/**
 * @fileOverview A flow to translate English text to Chinese.
 *
 * - translateEnglishToChinese - A function that handles the translation process.
 * - TranslateEnglishToChineseInput - The input type for the translateEnglishToChinese function.
 * - TranslateEnglishToChineseOutput - The return type for the translateEnglishToChinese function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const TranslateEnglishToChineseInputSchema = z.object({
  text: z.string().describe('The English text to translate.'),
});
export type TranslateEnglishToChineseInput = z.infer<typeof TranslateEnglishToChineseInputSchema>;

const TranslateEnglishToChineseOutputSchema = z.object({
  translatedText: z.string().describe('The translated Chinese text.'),
});
export type TranslateEnglishToChineseOutput = z.infer<typeof TranslateEnglishToChineseOutputSchema>;

export async function translateEnglishToChinese(input: TranslateEnglishToChineseInput): Promise<TranslateEnglishToChineseOutput> {
  return translateEnglishToChineseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateEnglishToChinesePrompt',
  input: {
    schema: z.object({
      text: z.string().describe('The English text to translate.'),
    }),
  },
  output: {
    schema: z.object({
      translatedText: z.string().describe('The translated Chinese text.'),
    }),
  },
  prompt: `Translate the following English text to Chinese:\n\n{{text}}`,
});

const translateEnglishToChineseFlow = ai.defineFlow<
  typeof TranslateEnglishToChineseInputSchema,
  typeof TranslateEnglishToChineseOutputSchema
>(
  {
    name: 'translateEnglishToChineseFlow',
    inputSchema: TranslateEnglishToChineseInputSchema,
    outputSchema: TranslateEnglishToChineseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
