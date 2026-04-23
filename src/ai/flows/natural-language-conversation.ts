'use server';

/**
 * @fileOverview Provides natural language conversation capabilities.
 *
 * - converse - A function that handles general conversation and small talk.
 * - ConverseInput - The input type for the converse function.
 * - ConverseOutput - The return type for the converse function.
 */

import { getAI } from '@/ai/genkit';
import {z} from 'genkit';

const ai = await getAI();

const ConverseInputSchema = z.object({
  message: z.string().describe('The user message for general conversation.'),
  conversationHistory: z.array(z.object({
    id: z.string(),
    text: z.string(),
    sender: z.enum(['user', 'bot', 'system']), // Allow 'system' as sender
    timestamp: z.string(),
    mode: z.enum(['info', 'chat', 'booking', 'system'])
  })).optional().describe('Previous messages in the conversation for context.'),
});
export type ConverseInput = z.infer<typeof ConverseInputSchema>;

const ConverseOutputSchema = z.object({
  response: z.string().describe('The AI response to the user message.'),
});
export type ConverseOutput = z.infer<typeof ConverseOutputSchema>;

export async function converse(input: ConverseInput): Promise<ConverseOutput> {
  return converseFlow(input);
}

const prompt = ai?.definePrompt({
  name: 'conversePrompt',
  input: {schema: ConverseInputSchema},
  output: {schema: ConverseOutputSchema},
  prompt: `You are ButeoBot, a friendly AI assistant for ButeoBot Inc. Engage in natural conversation with users.

Conversation History:
{{#if conversationHistory}}
{{#each conversationHistory}}
{{sender}}: {{text}}
{{/each}}
{{else}}
No previous conversation.
{{/if}}

User's current message: "{{{message}}}"

Instructions:
1. Use the conversation history to maintain context and provide more relevant responses
2. Be friendly, helpful, and conversational
3. Keep responses concise and natural
4. If the user asks about your capabilities, mention that you can help with company information, general conversation, or booking appointments
5. Don't be overly formal - be approachable and engaging

IMPORTANT: 
- Always return a valid JSON object with a "response" field
- Never mention tools, processes, or technical details to the user
- Focus on being helpful and engaging in natural conversation`,
});

const converseFlow = ai?.defineFlow(
  {
    name: 'converseFlow',
    inputSchema: ConverseInputSchema,
    outputSchema: ConverseOutputSchema,
  },
  async (input: ConverseInput) => {
    try {
      if (!prompt) {
        throw new Error('AI prompt not initialized');
      }
      
      const {output} = await prompt(input);
      
      if (output && output.response) {
        return output;
      }
    } catch (error) {
      console.error('Error in converse flow:', error);
    }
    
    // Fallback response
    return {
      response: "I'm here to help! I can assist with company information, general conversation, or booking appointments. What would you like to know?",
    };
  }
);
