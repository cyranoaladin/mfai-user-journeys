import { JourneyState } from '../journeyStore';
import { createTestStore, mockGetAllJourneys, mockGetJourneysByPersona, mockGetJourneyBySlug, mockIsPhaseUnlocked } from '../createTestStore';

describe('journeyStore', () => {
  beforeEach(() => {
    // Clear des mocks
    jest.clearAllMocks();
    mockGetAllJourneys.mockReset();
    mockGetJourneysByPersona.mockReset();
    mockGetJourneyBySlug.mockReset();
    mockIsPhaseUnlocked.mockReset();
  });
  
  describe('fetchAllJourneys', () => {
    it('should fetch all journeys and update state', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Mock des données de retour
      const mockJourneys = [
        {
          metadata: { title: 'Journey 1', slug: 'journey-1' },
          phases: [{ title: 'Phase 1' }],
        },
        {
          metadata: { title: 'Journey 2', slug: 'journey-2' },
          phases: [{ title: 'Phase 1' }],
        },
      ];
      
      // Setup du mock
      mockGetAllJourneys.mockResolvedValue(mockJourneys);
      
      // Vérification de l'état initial
      expect(useStore.getState().journeys).toEqual([]);
      expect(useStore.getState().loading).toBe(false);
      
      // Appel de la méthode à tester
      await useStore.getState().fetchAllJourneys();
      
      // Vérification de l'état après l'appel
      expect(useStore.getState().journeys).toEqual(mockJourneys);
      expect(useStore.getState().loading).toBe(false);
      expect(mockGetAllJourneys).toHaveBeenCalledTimes(1);
    });
    
    it('should handle empty journeys array', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Setup du mock pour retourner un tableau vide
      mockGetAllJourneys.mockResolvedValue([]);
      
      // Appel de la méthode à tester
      await useStore.getState().fetchAllJourneys();
      
      // Vérification de l'état après l'appel
      expect(useStore.getState().journeys).toEqual([]);
      // Dans le store de test, l'erreur n'est pas définie pour un tableau vide
      expect(useStore.getState().loading).toBe(false);
    });
    
    it('should handle null journeys response', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Setup du mock pour retourner null
      mockGetAllJourneys.mockResolvedValue(null);
      
      // Appel de la méthode à tester
      await useStore.getState().fetchAllJourneys();
      
      // Vérification de l'état après l'appel
      // Dans le store de test, null est conservé tel quel
      expect(useStore.getState().journeys).toBeNull();
      expect(useStore.getState().loading).toBe(false);
    });
    
    it('should handle errors when fetching journeys', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Setup du mock pour simuler une erreur
      mockGetAllJourneys.mockRejectedValue(new Error('API Error'));
      
      // Appel de la méthode à tester
      await useStore.getState().fetchAllJourneys();
      
      // Vérification de l'état après l'erreur
      expect(useStore.getState().journeys).toEqual([]);
      expect(useStore.getState().error).toBe('Error fetching journeys: API Error');
      expect(useStore.getState().loading).toBe(false);
    });
    
    it('should handle network errors specifically', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Setup du mock pour simuler une erreur réseau
      mockGetAllJourneys.mockRejectedValue(new Error('Network error'));
      
      // Appel de la méthode à tester
      await useStore.getState().fetchAllJourneys();
      
      // Vérification de l'état après l'erreur
      expect(useStore.getState().journeys).toEqual([]);
      expect(useStore.getState().error).toBe('Error fetching journeys: Network error');
      expect(useStore.getState().loading).toBe(false);
    });
  });
  
  describe('fetchJourneyBySlug', () => {
    it('should fetch a journey by slug and set it as current journey', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Mock des données de retour
      const mockJourney = {
        metadata: { title: 'Test Journey', slug: 'test-journey' },
        phases: [
          { title: 'Phase 1', locked: false },
          { title: 'Phase 2', locked: true },
        ],
      };
      
      // Setup du mock
      mockGetJourneyBySlug.mockResolvedValue(mockJourney);
      
      // Vérification de l'état initial
      expect(useStore.getState().currentJourney).toBeNull();
      
      // Appel de la méthode à tester
      await useStore.getState().fetchJourneyBySlug('test-journey');
      
      // Vérification de l'état après l'appel
      expect(useStore.getState().currentJourney).toEqual(mockJourney);
      expect(useStore.getState().currentPhaseIndex).toBe(0);
      expect(mockGetJourneyBySlug).toHaveBeenCalledWith('test-journey');
    });
    
    it('should handle errors when fetching journey by slug', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Setup du mock pour simuler une erreur
      mockGetJourneyBySlug.mockRejectedValue(new Error('Journey not found'));
      
      // Appel de la méthode à tester
      await useStore.getState().fetchJourneyBySlug('invalid-slug');
      
      // Vérification de l'état après l'erreur
      expect(useStore.getState().currentJourney).toBeNull();
      expect(useStore.getState().error).toBe('Error fetching journey: Journey not found');
      expect(useStore.getState().loading).toBe(false);
    });
    
    it('should handle null response when fetching journey by slug', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Setup du mock pour simuler un retour null
      mockGetJourneyBySlug.mockResolvedValue(null);
      
      // Appel de la méthode à tester
      await useStore.getState().fetchJourneyBySlug('non-existent-slug');
      
      // Vérification de l'état après l'appel
      // Dans le store de test, le currentJourney est mis à null quand le journey n'est pas trouvé
      expect(useStore.getState().currentJourney).toBeNull();
      expect(useStore.getState().loading).toBe(false);
    });
  });
  
  describe('fetchJourneysByPersona', () => {
    it('should fetch journeys by persona and update state', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Mock des données de retour
      const mockJourneys = [
        {
          metadata: { title: 'Investor Journey', slug: 'investor', profileType: 'Investor' },
          phases: [{ title: 'Phase 1' }],
        }
      ];
      
      // Setup du mock
      mockGetJourneysByPersona.mockResolvedValue(mockJourneys);
      
      // Vérification de l'état initial
      expect(useStore.getState().journeys).toEqual([]);
      
      // Appel de la méthode à tester
      await useStore.getState().fetchJourneysByPersona('Investor');
      
      // Vérification de l'état après l'appel
      expect(useStore.getState().journeys).toEqual(mockJourneys);
      // Dans le store de test, currentJourney n'est pas automatiquement défini
      expect(useStore.getState().loading).toBe(false);
      expect(mockGetJourneysByPersona).toHaveBeenCalledWith('Investor');
    });
    
    it('should handle empty journeys array for a persona', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Setup du mock pour retourner un tableau vide
      mockGetJourneysByPersona.mockResolvedValue([]);
      
      // Appel de la méthode à tester
      await useStore.getState().fetchJourneysByPersona('EmptyPersona');
      
      // Vérification de l'état après l'appel
      expect(useStore.getState().journeys).toEqual([]);
      // Dans le store de test, l'erreur n'est pas définie pour un tableau vide
      expect(useStore.getState().loading).toBe(false);
    });
    
    it('should handle null response for a persona', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Setup du mock pour retourner null
      mockGetJourneysByPersona.mockResolvedValue(null);
      
      // Appel de la méthode à tester
      await useStore.getState().fetchJourneysByPersona('NullPersona');
      
      // Vérification de l'état après l'appel
      // Dans le store de test, null est conservé tel quel
      expect(useStore.getState().journeys).toBeNull();
      expect(useStore.getState().loading).toBe(false);
    });
    
    it('should handle undefined persona parameter', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Appel de la méthode à tester avec un paramètre undefined
      // @ts-ignore - On ignore l'erreur TypeScript pour tester le comportement avec undefined
      await useStore.getState().fetchJourneysByPersona(undefined);
      
      // Vérification que le service a bien été appelé avec undefined
      expect(mockGetJourneysByPersona).toHaveBeenCalledWith(undefined);
      
      // Vérification de l'état après l'appel
      // Le comportement exact dépend de l'implémentation, mais on s'attend à ce que l'état soit géré correctement
      expect(useStore.getState().loading).toBe(false);
    });
    
    it('should handle errors when fetching journeys by persona', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Setup du mock pour simuler une erreur
      mockGetJourneysByPersona.mockRejectedValue(new Error('Invalid persona'));
      
      // Appel de la méthode à tester
      await useStore.getState().fetchJourneysByPersona('InvalidPersona');
      
      // Vérification de l'état après l'erreur
      expect(useStore.getState().journeys).toEqual([]);
      expect(useStore.getState().error).toBe('Error fetching journeys by persona: Invalid persona');
      expect(useStore.getState().loading).toBe(false);
    });
    
    it('should handle network errors specifically', async () => {
      // Créer un store isolé pour ce test
      const useStore = createTestStore();
      
      // Setup du mock pour simuler une erreur réseau
      mockGetJourneysByPersona.mockRejectedValue(new Error('Network error'));
      
      // Appel de la méthode à tester
      await useStore.getState().fetchJourneysByPersona('Investor');
      
      // Vérification de l'état après l'erreur
      expect(useStore.getState().journeys).toEqual([]);
      expect(useStore.getState().error).toBe('Error fetching journeys by persona: Network error');
      expect(useStore.getState().loading).toBe(false);
    });
  });
  
  describe('navigation methods', () => {
    let useStore;
    
    beforeEach(async () => {
      // Créer un store isolé pour chaque test
      useStore = createTestStore();
      
      // Setup d'un journey pour les tests de navigation
      const mockJourney = {
        metadata: { title: 'Test Journey', slug: 'test-journey' },
        phases: [
          { title: 'Phase 1', locked: false },
          { title: 'Phase 2', locked: false },
          { title: 'Phase 3', locked: true },
        ],
      };
      
      // Setup du mock
      mockGetJourneyBySlug.mockResolvedValue(mockJourney);
      
      // Initialisation du store avec un journey
      await useStore.getState().fetchJourneyBySlug('test-journey');
    });
    
    it('should navigate to next phase', () => {
      // État initial
      expect(useStore.getState().currentPhaseIndex).toBe(0);
      
      // Navigation à la phase suivante
      useStore.getState().nextPhase();
      
      // Vérification
      expect(useStore.getState().currentPhaseIndex).toBe(1);
    });
    
    it('should navigate to previous phase', () => {
      // Aller d'abord à la phase 1
      useStore.getState().setCurrentPhaseIndex(1);
      
      expect(useStore.getState().currentPhaseIndex).toBe(1);
      
      // Retour à la phase précédente
      useStore.getState().previousPhase();
      
      // Vérification
      expect(useStore.getState().currentPhaseIndex).toBe(0);
    });
    
    it('should not navigate past the last phase', () => {
      // Aller à la dernière phase
      useStore.getState().setCurrentPhaseIndex(2);
      
      expect(useStore.getState().currentPhaseIndex).toBe(2);
      
      // Essayer d'aller à la phase suivante (qui n'existe pas)
      useStore.getState().nextPhase();
      
      // Vérification que l'index n'a pas changé
      expect(useStore.getState().currentPhaseIndex).toBe(2);
    });
    
    it('should not navigate before the first phase', () => {
      // État initial (phase 0)
      expect(useStore.getState().currentPhaseIndex).toBe(0);
      
      // Essayer d'aller à la phase précédente
      useStore.getState().previousPhase();
      
      // Vérification que l'index n'a pas changé
      expect(useStore.getState().currentPhaseIndex).toBe(0);
    });
    
    describe('setCurrentPhaseIndex', () => {
      it('should set the current phase index to a valid value', () => {
        // Définir l'index à une valeur valide
        useStore.getState().setCurrentPhaseIndex(1);
        
        // Vérification
        expect(useStore.getState().currentPhaseIndex).toBe(1);
      });
      
      it('should handle negative phase index by setting to 0', () => {
        // Définir l'index à une valeur négative
        useStore.getState().setCurrentPhaseIndex(-5);
        
        // Vérification que l'index est limité à 0
        expect(useStore.getState().currentPhaseIndex).toBe(0);
      });
      
      it('should handle phase index greater than max by setting to max', () => {
        // Définir l'index à une valeur supérieure au maximum
        useStore.getState().setCurrentPhaseIndex(10);
        
        // Vérification que l'index est limité au maximum (2 dans notre cas)
        expect(useStore.getState().currentPhaseIndex).toBe(2);
      });
      
      it('should do nothing when no journey is selected', () => {
        // Reset du journey pour avoir un état sans journey sélectionné
        useStore.setState({ currentJourney: null, currentPhaseIndex: 0 });
        
        // Essayer de définir l'index de phase
        useStore.getState().setCurrentPhaseIndex(1);
        
        // Vérification que l'index n'a pas changé
        expect(useStore.getState().currentPhaseIndex).toBe(0);
      });
    });
    
    describe('nextPhase and previousPhase with no journey', () => {
      it('should not change phase index when calling nextPhase with no journey', () => {
        // Reset du journey pour avoir un état sans journey sélectionné
        useStore.setState({ currentJourney: null, currentPhaseIndex: 0 });
        
        // Essayer d'aller à la phase suivante
        useStore.getState().nextPhase();
        
        // Vérification que l'index n'a pas changé
        expect(useStore.getState().currentPhaseIndex).toBe(0);
      });
    });
  });
  
  describe('resetJourney', () => {
    let useStore;
    
    beforeEach(async () => {
      // Créer un store isolé pour chaque test
      useStore = createTestStore();
      
      // Setup d'un journey pour les tests
      const mockJourney = {
        metadata: { title: 'Test Journey', slug: 'test-journey' },
        phases: [
          { title: 'Phase 1', locked: false },
          { title: 'Phase 2', locked: false },
          { title: 'Phase 3', locked: true },
        ],
      };
      
      // Setup du mock
      mockGetJourneyBySlug.mockResolvedValue(mockJourney);
      
      // Initialisation du store avec un journey et navigation à une phase spécifique
      await useStore.getState().fetchJourneyBySlug('test-journey');
      useStore.getState().setCurrentPhaseIndex(1);
    });
    
    it('should reset the journey to the first phase', () => {
      // Vérification de l'état avant reset
      expect(useStore.getState().currentJourney).not.toBeNull();
      expect(useStore.getState().currentPhaseIndex).toBe(1);
      
      // Reset du journey
      useStore.getState().resetJourney();
      
      // Vérification de l'état après reset
      // Dans le store de test, resetJourney réinitialise tout le journey
      expect(useStore.getState().currentPhaseIndex).toBe(0);
    });
  });
  
  describe('setCurrentJourney', () => {
    let useStore;
    
    beforeEach(() => {
      // Créer un store isolé pour chaque test
      useStore = createTestStore();
    });
    
    it('should set the current journey and reset phase index', () => {
      // Création d'un journey de test
      const mockJourney = {
        metadata: { title: 'New Journey', slug: 'new-journey' },
        phases: [
          { title: 'Phase A', locked: false },
          { title: 'Phase B', locked: true },
        ],
      };
      
      // D'abord, définir un index de phase non nul
      useStore.getState().setCurrentPhaseIndex(2);
      
      // Ensuite, définir le journey courant
      useStore.getState().setCurrentJourney(mockJourney);
      
      // Vérification de l'état après l'appel
      expect(useStore.getState().currentJourney).toEqual(mockJourney);
      expect(useStore.getState().currentPhaseIndex).toBe(0); // L'index doit être réinitialisé
    });
    
    it('should handle null journey', () => {
      // D'abord, définir un journey
      const mockJourney = {
        metadata: { title: 'Temp Journey', slug: 'temp-journey' },
        phases: [{ title: 'Phase 1', locked: false }],
      };
      useStore.getState().setCurrentJourney(mockJourney);
      
      // Vérifier que le journey est bien défini
      expect(useStore.getState().currentJourney).toEqual(mockJourney);
      
      // Ensuite, définir le journey à null
      useStore.getState().setCurrentJourney(null);
      
      // Vérification de l'état après l'appel
      expect(useStore.getState().currentJourney).toBeNull();
      expect(useStore.getState().currentPhaseIndex).toBe(0);
    });
  });

  describe('selectors', () => {
    let useStore;
    
    beforeEach(async () => {
      // Créer un store isolé pour chaque test
      useStore = createTestStore();
      
      // Setup d'un journey pour les tests des sélecteurs
      const mockJourney = {
        metadata: { title: 'Test Journey', slug: 'test-journey' },
        phases: [
          { title: 'Phase 1', locked: false },
          { title: 'Phase 2', locked: false },
          { title: 'Phase 3', locked: true },
        ],
      };
      
      // Setup du mock
      mockGetJourneyBySlug.mockResolvedValue(mockJourney);
      mockIsPhaseUnlocked.mockImplementation((phase, xp, nfts) => !phase.locked);
      
      // Initialisation du store avec un journey
      await useStore.getState().fetchJourneyBySlug('test-journey');
    });
    
    it('should get current phase', () => {
      // Vérification de la phase courante
      expect(useStore.getState().getCurrentPhase()).toEqual({ title: 'Phase 1', locked: false });
      
      // Changement de phase
      useStore.getState().setCurrentPhaseIndex(1);
      
      // Vérification de la nouvelle phase courante
      expect(useStore.getState().getCurrentPhase()).toEqual({ title: 'Phase 2', locked: false });
    });
    
    it('should return null for getCurrentPhase when no journey is selected', () => {
      // Reset du journey pour avoir un état sans journey sélectionné
      useStore.getState().resetJourney();
      
      // Vérification que getCurrentPhase retourne null
      expect(useStore.getState().getCurrentPhase()).toBeNull();
    });
    
    it('should check if phase is unlocked', () => {
      // Phase 0 (déverrouillée)
      expect(useStore.getState().isPhaseUnlocked(0, 0, [])).toBe(true);
      
      // Phase 2 (verrouillée)
      expect(useStore.getState().isPhaseUnlocked(2, 0, [])).toBe(false);
    });
    
    it('should handle invalid phase index in isPhaseUnlocked', () => {
      // Index de phase négatif
      expect(useStore.getState().isPhaseUnlocked(-1, 0, [])).toBe(false);
      
      // Index de phase trop grand
      expect(useStore.getState().isPhaseUnlocked(10, 0, [])).toBe(false);
    });
    
    it('should handle null journey in isPhaseUnlocked', () => {
      // Reset du journey pour avoir un état sans journey sélectionné
      useStore.getState().resetJourney();
      
      // Vérification que isPhaseUnlocked retourne false quand il n'y a pas de journey
      expect(useStore.getState().isPhaseUnlocked(0, 0, [])).toBe(false);
    });
  });
});
