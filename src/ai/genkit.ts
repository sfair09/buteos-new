import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { getSecret } from '@/utils/secrets';

// Singleton instance
let aiInstance: ReturnType<typeof genkit> | null = null;
let ai: {
  defineFlow: typeof genkit.prototype.defineFlow;
  definePrompt: typeof genkit.prototype.definePrompt;
  defineTool: typeof genkit.prototype.defineTool;
} | null = null;

// Initialize AI if not already initialized
async function ensureInitialized() {
  if (!aiInstance || !ai) {
    const apiKey = process.env.GOOGLE_API_KEY || await getSecret('GOOGLE_API_KEY');
    
    aiInstance = genkit({
      plugins: [
        googleAI({
          apiKey
        })
      ],
      model: 'googleai/gemini-2.0-flash',
    });
    
    if (aiInstance) {
      ai = {
        defineFlow: aiInstance.defineFlow.bind(aiInstance),
        definePrompt: aiInstance.definePrompt.bind(aiInstance),
        defineTool: aiInstance.defineTool.bind(aiInstance),
      };
    }
  }
  return ai;
}

// Export a function to get the initialized ai object
export async function getAI() {
  return await ensureInitialized();
}

// For backward compatibility and development
export async function initializeAI() {
  return await ensureInitialized();
}
