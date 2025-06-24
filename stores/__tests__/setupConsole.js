// Sauvegarde des méthodes console originales
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// Remplacement des méthodes console pour les tests
console.error = jest.fn((...args) => {
  // Ignorer les erreurs spécifiques liées aux tests
  const errorMessage = args.join(' ');
  if (
    errorMessage.includes('Network Error') ||
    errorMessage.includes('Request timeout') ||
    errorMessage.includes('Erreur lors du chargement des parcours')
  ) {
    return;
  }
  originalConsoleError(...args);
});

console.warn = jest.fn((...args) => {
  // Ignorer les avertissements spécifiques liés aux tests
  const warnMessage = args.join(' ');
  if (
    warnMessage.includes('test warning') ||
    warnMessage.includes('mock warning')
  ) {
    return;
  }
  originalConsoleWarn(...args);
});

// Réinitialiser les mocks après chaque test
afterEach(() => {
  jest.clearAllMocks();
});

// Restaurer les méthodes console originales après tous les tests
afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});
