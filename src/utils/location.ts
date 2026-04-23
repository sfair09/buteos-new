export type LocationType = 'houston' | 'texas' | 'general';

export interface LocationData {
  city?: string;
  region?: string;
  country?: string;
}

export async function getLocationFromIP(): Promise<LocationType> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data: LocationData = await response.json();
    
    if (data.city?.toLowerCase().includes('houston') || 
        (data.region === 'Texas' && data.city?.toLowerCase().includes('houston'))) {
      return 'houston';
    }
    
    if (data.region === 'Texas' || data.region === 'TX') {
      return 'texas';
    }
    
    return 'general';
  } catch (error) {
    console.error('Failed to get location:', error);
    return 'general';
  }
}

export async function getLocationFromHeaders(): Promise<LocationType> {
  try {
    const headersList = await import('next/headers').then(m => m.headers());
    const city = headersList.get('x-vercel-ip-city')?.toLowerCase();
    const region = headersList.get('x-vercel-ip-country-region');
    
    if (city?.includes('houston') || (region === 'TX' && city?.includes('houston'))) {
      return 'houston';
    }
    
    if (region === 'TX') {
      return 'texas';
    }
    
    return 'general';
  } catch {
    return 'general';
  }
}