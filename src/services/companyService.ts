
'use server';
/**
 * @fileOverview Company data service that reads from a JSON file.
 */

import fs from 'fs/promises';
import path from 'path';

interface CompanyData {
  [key: string]: any;
  name?: string;
  tagline?: string;
  foundedYear?: number;
  services?: string[];
  history?: string;
  contact?: {
    phone: string;
    email: string;
    address: string;
    website?: string;
  };
  products?: Array<{ name: string; description: string; features?: string[]; price: string | number }>;
  officeHours?: string;
  mission?: string;
  values?: string[];
  careers?: string;
  defaultInfo?: string;
}

// Path to the data file
const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'company-data.json');

let companyData: CompanyData | null = null;
let lastModifiedTime: number = 0;

async function loadCompanyData(): Promise<CompanyData> {
  try {
    const stats = await fs.stat(DATA_FILE_PATH);
    // Reload data if file has been modified or not loaded yet
    if (!companyData || stats.mtimeMs > lastModifiedTime) {
      console.log('Loading/reloading company data from JSON file...');
      const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
      companyData = JSON.parse(fileContent) as CompanyData;
      lastModifiedTime = stats.mtimeMs;
      console.log('Company data loaded successfully.');
    }
    return companyData!;
  } catch (error) {
    console.error('Failed to load company data from JSON file:', error);
    // Fallback to an empty object or minimal default if file is missing/corrupt
    return {
      defaultInfo: "I'm sorry, but I'm currently unable to access detailed company information. Please try again later.",
    };
  }
}

export async function getCompanyInfo(topic: string): Promise<{ data: any; error?: string }> {
  const data = await loadCompanyData();
  console.log(`Fetching company info for topic: "${topic}"`);

  const lowerTopic = topic.toLowerCase().trim();

  // Direct key match (case-insensitive for keys)
  for (const key in data) {
    if (key.toLowerCase() === lowerTopic) {
      return { data: data[key] };
    }
  }

  // Keyword-based matching for more conversational queries
  if (lowerTopic.includes('service') || lowerTopic.includes('offer')) {
    return { data: data.services || data.defaultInfo };
  }
  if (lowerTopic.includes('history') || lowerTopic.includes('founded') || lowerTopic.includes('background')) {
    return { data: data.history || data.defaultInfo };
  }
  if (lowerTopic.includes('contact') || lowerTopic.includes('phone') || lowerTopic.includes('email') || lowerTopic.includes('address') || lowerTopic.includes('website')) {
    return { data: data.contact || data.defaultInfo };
  }
  if (lowerTopic.includes('product')) {
    return { data: data.products || data.defaultInfo };
  }
  if (lowerTopic.includes('hour') || lowerTopic.includes('open') || lowerTopic.includes('close')) {
    return { data: data.officeHours || data.defaultInfo };
  }
  if (lowerTopic.includes('mission')) {
    return { data: data.mission || data.defaultInfo };
  }
  if (lowerTopic.includes('value') || lowerTopic.includes('principle')) {
    return { data: data.values || data.defaultInfo };
  }
  if (lowerTopic.includes('career') || lowerTopic.includes('job') || lowerTopic.includes('hiring')) {
    return { data: data.careers || data.defaultInfo };
  }
  if (lowerTopic.includes('about') || lowerTopic.includes('tell me more') || lowerTopic.includes('who are you')) {
    return { data: { name: data.name, tagline: data.tagline, history: data.history, mission: data.mission, defaultInfo: data.defaultInfo } };
  }
  if (lowerTopic === 'name') {
    return { data: data.name || data.defaultInfo };
  }
  if (lowerTopic.includes('all') || lowerTopic.includes('everything')) {
    // Return a summary or a subset of important fields, not the whole object directly to LLM unless small.
    // For now, let's just return the defaultInfo as "everything" can be too verbose.
    return { data: data.defaultInfo };
  }

  console.warn(`No specific data found for topic: "${topic}". Returning default info.`);
  return { data: data.defaultInfo };
}
