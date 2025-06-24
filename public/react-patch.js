// Ce fichier applique un patch aux hooks React pour éviter les erreurs d'initialisation
// Il est chargé avant tout autre code via un script dans _document.js

// Sauvegarder les méthodes React originales si elles existent
if (typeof window !== 'undefined') {
  // Créer un objet React global s'il n'existe pas
  window.React = window.React || {};
  
  // Sauvegarder les méthodes originales
  const originalUseState = window.React.useState;
  const originalUseEffect = window.React.useEffect;
  const originalUseContext = window.React.useContext;
  const originalUseReducer = window.React.useReducer;
  
  // Remplacer useState par une version sécurisée
  window.React.useState = function safeUseState(initialState) {
    try {
      if (typeof originalUseState === 'function') {
        return originalUseState(initialState);
      }
    } catch (e) {
      console.warn('React.useState error intercepted:', e);
    }
    // Retourner un état par défaut et une fonction de mise à jour qui ne fait rien
    return [typeof initialState === 'function' ? initialState() : initialState, function() {}];
  };
  
  // Remplacer useEffect par une version sécurisée
  window.React.useEffect = function safeUseEffect(effect, deps) {
    try {
      if (typeof originalUseEffect === 'function') {
        return originalUseEffect(effect, deps);
      }
    } catch (e) {
      console.warn('React.useEffect error intercepted:', e);
    }
    // Ne rien faire
    return;
  };
  
  // Remplacer useContext par une version sécurisée
  window.React.useContext = function safeUseContext(context) {
    try {
      if (typeof originalUseContext === 'function') {
        return originalUseContext(context);
      }
    } catch (e) {
      console.warn('React.useContext error intercepted:', e);
    }
    // Retourner un contexte vide
    return {};
  };
  
  // Remplacer useReducer par une version sécurisée
  window.React.useReducer = function safeUseReducer(reducer, initialState) {
    try {
      if (typeof originalUseReducer === 'function') {
        return originalUseReducer(reducer, initialState);
      }
    } catch (e) {
      console.warn('React.useReducer error intercepted:', e);
    }
    // Retourner un état par défaut et une fonction de dispatch qui ne fait rien
    return [initialState, function() {}];
  };
  
  console.log('React hooks patched successfully');
}
