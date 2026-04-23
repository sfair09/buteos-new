'use client';

import { useEffect, useState } from 'react';
import { LocationType, getLocationFromIP } from '@/utils/location';
import { localizedContent } from '@/data/localized-content';

interface LocationWrapperProps {
  serverLocation?: LocationType;
  onLocationChange: (content: typeof localizedContent.houston) => void;
}

export default function LocationWrapper({ serverLocation, onLocationChange }: LocationWrapperProps) {
  const [location, setLocation] = useState<LocationType>(serverLocation || 'general');

  useEffect(() => {
    if (!serverLocation) {
      getLocationFromIP().then(setLocation);
    }
  }, [serverLocation]);

  useEffect(() => {
    onLocationChange(localizedContent[location]);
  }, [location, onLocationChange]);

  return null;
}