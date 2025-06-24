import { useState, useCallback } from 'react';

export const usePhaseForceUpdate = () => {
  const [updateCounter, setUpdateCounter] = useState(0);

  const triggerUpdate = useCallback(() => {
    setUpdateCounter(prev => prev + 1);
  }, []);

  return {
    updateCounter,
    triggerUpdate,
  };
};
