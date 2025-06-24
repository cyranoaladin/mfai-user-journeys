import { useState, useEffect } from 'react';
import { useStore } from '@/utils/store';
import { getJourneysByPersona } from '@/services/journeyService';
import { PersonaType, JourneyContent } from '@/types';

/**
 * Custom hook to get current journey data based on selected persona
 * This hook properly uses React hooks within a component context
 */
export const useCurrentJourney = () => {
  const selectedPersona = useStore(state => state.selectedPersona);
  const [journey, setJourney] = useState<JourneyContent | null>(null);
  
  useEffect(() => {
    // If no persona is selected, do nothing
    if (!selectedPersona) {
      setJourney(null);
      return;
    }
    
    const fetchJourney = async () => {
      try {
        const journeys = await getJourneysByPersona(selectedPersona as PersonaType);
        if (journeys && journeys.length > 0) {
          setJourney(journeys[0]);
        } else {
          setJourney(null);
        }
      } catch (error) {
        console.error('Error retrieving journey:', error);
        setJourney(null);
      }
    };
    
    fetchJourney();
  }, [selectedPersona]);
  
  return journey;
};

export default useCurrentJourney;
