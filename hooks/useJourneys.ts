import { useState, useEffect } from 'react';
import { JourneyContent } from '@/types/journey';

export function useJourneys() {
  const [journeys, setJourneys] = useState<JourneyContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await fetch('/api/journeys');
        if (!response.ok) {
          throw new Error('Failed to fetch journeys');
        }
        const data = await response.json();
        setJourneys(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchJourneys();
  }, []);

  return { journeys, isLoading, error };
}
