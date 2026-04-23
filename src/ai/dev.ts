import { config } from 'dotenv';
config();

import { initializeAI } from '@/ai/genkit';

// Initialize AI before importing flows
await initializeAI();

import '@/ai/flows/company-info-chat.ts';
import '@/ai/flows/natural-language-conversation.ts';
import '@/ai/flows/ai-appointment-booking.ts';
import '@/ai/flows/inquiry-router-flow.ts';

// Import tool definitions so Genkit is aware of them
import '@/ai/tools/emailTool.ts';
import '@/ai/tools/calendarTools.ts';
import '@/ai/tools/companyDataTool.ts';
