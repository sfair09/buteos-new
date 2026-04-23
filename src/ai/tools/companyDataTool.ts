'use server';
/**
 * @fileOverview Genkit tool for fetching company data.
 */
import { getAI } from '@/ai/genkit';
import {z} from 'genkit';
import { getCompanyInfo } from '@/services/companyService';

const ai = await getAI();
// Schema for getCompanyInfoTool input
const GetCompanyInfoInputSchema = z.object({
  topic: z.string().describe("The specific topic or area of company information the user is asking about (e.g., 'services', 'history', 'contact', 'office hours', 'product names'). Be specific."),
});
export type GetCompanyInfoInput = z.infer<typeof GetCompanyInfoInputSchema>;

// Schema for getCompanyInfoTool output
const GetCompanyInfoOutputSchema = z.object({
  retrievedData: z.any().describe("The information retrieved regarding the topic. This could be a string, an object, or an array depending on the data. If no specific data found, might be a default summary."),
  error: z.string().optional().describe("Error message if data fetching failed."),
});
export type GetCompanyInfoOutput = z.infer<typeof GetCompanyInfoOutputSchema>;

export const getCompanyInfoTool = ai.defineTool(
  {
    name: 'getCompanyInfoTool',
    description: 'Retrieves specific information about the company based on a topic. Useful for answering questions about services, history, contact details, products, office hours etc.',
    inputSchema: GetCompanyInfoInputSchema,
    outputSchema: GetCompanyInfoOutputSchema,
  },
  async (input: GetCompanyInfoInput) => {
    console.log('getCompanyInfoTool invoked with input:', input);
    try {
      const result = await getCompanyInfo(input.topic);
      if (result.error) {
        return { retrievedData: null, error: result.error };
      }
      return { retrievedData: result.data };
    } catch (e: any) {
      console.error("Error in getCompanyInfoTool:", e);
      return { retrievedData: null, error: e.message || "An unexpected error occurred while fetching company data." };
    }
  }
);
