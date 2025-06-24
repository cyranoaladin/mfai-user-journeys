// Configuration globale pour Jest
// Ce fichier est chargé automatiquement avant l'exécution des tests

// Supprimer les avertissements de React 18 dans les tests
const originalConsoleError = console.error;
console.error = (...args) => {
  // Ignorer les avertissements spécifiques de React
  if (
    args[0]?.includes?.('Warning: ReactDOM.render is no longer supported') ||
    args[0]?.includes?.('Warning: The current testing environment is not configured to support act')
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Réinitialiser tous les mocks après chaque test
afterEach(() => {
  jest.clearAllMocks();
});

// Configuration globale pour les tests
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
