# Tests des Stores Zustand

Ce dossier contient les tests unitaires pour les stores Zustand utilisés dans l'application.

## Approche de test

### Isolation des tests

Pour garantir l'isolation complète entre les tests, nous utilisons une approche basée sur la création d'instances de store isolées pour chaque test. Cette méthode évite les problèmes de partage d'état entre les tests et assure des résultats cohérents et reproductibles.

### Fichier `createTestStore.ts`

Le fichier `createTestStore.ts` fournit une fonction utilitaire qui crée un store de test isolé pour chaque test. Cette fonction :

- Crée une nouvelle instance de store Zustand
- Configure les mocks nécessaires pour les services externes
- Expose les mêmes méthodes et propriétés que le store original

### Mocking des services

Les services externes (comme `journeyService`) sont mockés pour simuler différents scénarios de réponse API :
- Réponses réussies avec données
- Erreurs et exceptions
- Comportements spécifiques pour les tests

## Bonnes pratiques

1. **Créer un nouveau store pour chaque test** : Utilisez `createTestStore()` au début de chaque test pour garantir l'isolation.

2. **Accéder à l'état via getState()** : Toujours utiliser `useStore.getState()` pour accéder à l'état le plus récent.

3. **Réinitialiser les mocks entre les tests** : Utilisez `jest.clearAllMocks()` et `mockFn.mockReset()` dans les hooks `beforeEach`.

4. **Tester les cas d'erreur** : Assurez-vous de tester les cas où les services retournent des erreurs.

## Exemple d'utilisation

```typescript
it('should fetch all journeys and update state', async () => {
  // Créer un store isolé pour ce test
  const useStore = createTestStore();
  
  // Setup du mock
  mockGetAllJourneys.mockResolvedValue(mockJourneys);
  
  // Appel de la méthode à tester
  await useStore.getState().fetchAllJourneys();
  
  // Vérification de l'état après l'appel
  expect(useStore.getState().journeys).toEqual(mockJourneys);
});
```

## Compatibilité React 18

Cette approche est compatible avec React 18, contrairement à l'utilisation de bibliothèques comme `@testing-library/react-hooks` qui peuvent poser des problèmes de compatibilité.
