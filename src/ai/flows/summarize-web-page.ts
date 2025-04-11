// 'use server';
/**
 * @fileOverview Summarizes the content of a web page given a URL.
 *
 * - summarizeWebPage - A function that summarizes the content of a web page.
 * - SummarizeWebPageInput - The input type for the summarizeWebPage function.
 * - SummarizeWebPageOutput - The return type for the summarizeWebPage function.
 */

'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeWebPageInputSchema = z.object({
  url: z.string().url().describe('The URL of the web page to summarize.'),
});
export type SummarizeWebPageInput = z.infer<typeof SummarizeWebPageInputSchema>;

const SummarizeWebPageOutputSchema = z.object({
  summary: z.string().describe('The summary of the web page content.'),
});
export type SummarizeWebPageOutput = z.infer<typeof SummarizeWebPageOutputSchema>;

export async function summarizeWebPage(input: SummarizeWebPageInput): Promise<SummarizeWebPageOutput> {
  return summarizeWebPageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeWebPagePrompt',
  input: {
    schema: z.object({
      url: z.string().url().describe('The URL of the web page to summarize.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('The summary of the web page content.'),
    }),
  },
  prompt: `You are an expert summarizer.  Summarize the content of the web page at the following URL in a concise manner:\n\nURL: {{{url}}}`, 
});

const summarizeWebPageFlow = ai.defineFlow<
  typeof SummarizeWebPageInputSchema,
  typeof SummarizeWebPageOutputSchema
>({
  name: 'summarizeWebPageFlow',
  inputSchema: SummarizeWebPageInputSchema,
  outputSchema: SummarizeWebPageOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
