import { LocationType } from '@/utils/location';

export interface LocalizedContent {
  location: string;
  locationAdjective: string;
  businessFocus: string;
  marketDescription: string;
  ctaText: string;
  seoKeywords: string[];
}

export const localizedContent: Record<LocationType, LocalizedContent> = {
  houston: {
    location: 'Houston',
    locationAdjective: 'Houston-based',
    businessFocus: 'Houston businesses',
    marketDescription: 'Houston market',
    ctaText: 'Get Your Free Houston Design Consultation',
    seoKeywords: ['Houston digital marketing', 'Houston SEO', 'Houston social media', 'Houston AI solutions']
  },
  texas: {
    location: 'Texas',
    locationAdjective: 'Texas-based',
    businessFocus: 'Texas businesses',
    marketDescription: 'Texas market',
    ctaText: 'Get Your Free Texas Design Consultation',
    seoKeywords: ['Texas digital marketing', 'Texas SEO', 'Texas social media', 'Texas AI solutions']
  },
  general: {
    location: '',
    locationAdjective: '',
    businessFocus: 'businesses',
    marketDescription: 'local market',
    ctaText: 'Get Your Free Design Consultation',
    seoKeywords: ['digital marketing', 'SEO services', 'social media management', 'AI solutions']
  }
};