import { useState, useCallback } from 'react';

export const usePhaseNotifications = () => {
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const showNotification = useCallback((message: string) => {
    setNotificationMessage(message);
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  }, []);

  const hideNotification = useCallback(() => {
    setNotificationMessage(null);
  }, []);

  return {
    showNotification,
    hideNotification,
    notificationMessage,
  };
};
