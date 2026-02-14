'use server';
/**
 * @fileOverview A Genkit flow that generates additional romantic reasons.
 *
 * - generateLoveReasons - A function that handles the generation of romantic reasons.
 * - GenerateLoveReasonsInput - The input type for the generateLoveReasons function.
 * - GenerateLoveReasonsOutput - The return type for the generateLoveReasons function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateLoveReasonsInputSchema = z.object({
  numReasons: z.number().int().min(1).max(20).default(5)
    .describe('The number of romantic reasons to generate.'),
});
export type GenerateLoveReasonsInput = z.infer<typeof GenerateLoveReasonsInputSchema>;

const GenerateLoveReasonsOutputSchema = z.object({
  reasons: z.array(z.string().min(5).max(150))
    .describe('A list of AI-generated romantic reasons.'),
});
export type GenerateLoveReasonsOutput = z.infer<typeof GenerateLoveReasonsOutputSchema>;

export async function generateLoveReasons(input: GenerateLoveReasonsInput): Promise<GenerateLoveReasonsOutput> {
  return generateLoveReasonsFlow(input);
}

const generateLoveReasonsPrompt = ai.definePrompt({
  name: 'generateLoveReasonsPrompt',
  input: { schema: GenerateLoveReasonsInputSchema },
  output: { schema: GenerateLoveReasonsOutputSchema },
  prompt: `You are a deeply romantic and articulate individual. Your task is to generate a list of {{numReasons}} unique, heartfelt, and genuinely romantic reasons why someone would love their partner. Each reason should be factually and grammatically correct, safe for a romantic context, and expressed as a single sentence or short phrase. Do not include numbering or bullet points.

Please ensure the generated reasons are diverse and express different facets of love, appreciation, or affection.

Example:
{
  "reasons": [
    "Your unwavering support through thick and thin.",
    "The way your laughter fills any room with joy.",
    "How you make even ordinary moments feel extraordinary.",
    "Your thoughtful gestures that always brighten my day.",
    "The comfort I find simply by being in your presence."
  ]
}
`,
});

const generateLoveReasonsFlow = ai.defineFlow(
  {
    name: 'generateLoveReasonsFlow',
    inputSchema: GenerateLoveReasonsInputSchema,
    outputSchema: GenerateLoveReasonsOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await generateLoveReasonsPrompt(input);
      if (!output) {
        throw new Error('Failed to generate romantic reasons: Model returned empty output.');
      }
      return output;
    } catch (e: any) {
      console.error("Error in generateLoveReasonsFlow:", e?.message, e?.stack);
      throw new Error(`Failed to generate romantic reasons: ${e.message || 'An unexpected error occurred during AI generation.'}`);
    }
  }
);
