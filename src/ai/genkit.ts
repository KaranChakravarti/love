import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI({ apiKey: "AIzaSyCMRWsszbbnzF2vm1NUi2-T6MrAx0MIq3A" })],
  model: 'googleai/gemini-1.5-flash',
});
