/**
 * Service for handling translations using ChatGPT API
 */

interface TranslationRequest {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
}

interface TranslationResult {
  originalText: string;
  translatedText: string;
  targetLanguage: string;
}

// Mock function to simulate ChatGPT API call
export async function translateText({
  text,
  targetLanguage,
  sourceLanguage = 'en'
}: TranslationRequest): Promise<string> {
  // In a real implementation, this would call the ChatGPT API
  // This is a mock implementation for demonstration purposes
  
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
  
  // Simple mock translation (just adds a prefix in real implementation)
  const mockTranslations: Record<string, Record<string, string>> = {
    'French (France)': {
      'Hello': 'Bonjour',
      'Welcome': 'Bienvenue',
      'Thank you': 'Merci',
      'Settings': 'Paramètres',
      'Profile': 'Profil',
      'Dashboard': 'Tableau de bord',
      'Log out': 'Déconnexion',
      'Save': 'Sauvegarder',
      'Cancel': 'Annuler',
      'Delete': 'Supprimer',
      'Error': 'Erreur',
      'Success': 'Succès',
    },
    'German (Germany)': {
      'Hello': 'Hallo',
      'Welcome': 'Willkommen',
      'Thank you': 'Danke',
      'Settings': 'Einstellungen',
      'Profile': 'Profil',
      'Dashboard': 'Armaturenbrett',
      'Log out': 'Ausloggen',
      'Save': 'Speichern',
      'Cancel': 'Abbrechen',
      'Delete': 'Löschen',
      'Error': 'Fehler',
      'Success': 'Erfolg',
    },
    'Spanish (Spain)': {
      'Hello': 'Hola',
      'Welcome': 'Bienvenido',
      'Thank you': 'Gracias',
      'Settings': 'Configuración',
      'Profile': 'Perfil',
      'Dashboard': 'Panel',
      'Log out': 'Cerrar sesión',
      'Save': 'Guardar',
      'Cancel': 'Cancelar',
      'Delete': 'Eliminar',
      'Error': 'Error',
      'Success': 'Éxito',
    },
  };
  
  // Check if we have a predefined mock translation
  if (mockTranslations[targetLanguage] && mockTranslations[targetLanguage][text]) {
    return mockTranslations[targetLanguage][text];
  }
  
  // Otherwise, create a mock translation
  const languagePrefix = targetLanguage.split(' ')[0].toLowerCase().substring(0, 3);
  return `[${languagePrefix}] ${text}`;
}

// Batch translate multiple strings
export async function batchTranslate(
  texts: string[],
  targetLanguage: string
): Promise<string[]> {
  // In a real implementation, we might batch requests to the API
  // Here we'll just translate sequentially
  const results: string[] = [];
  
  for (const text of texts) {
    const translated = await translateText({
      text,
      targetLanguage
    });
    results.push(translated);
  }
  
  return results;
}

// Translate an entire key-value collection
export async function translateKeyValuePairs(
  pairs: Array<{ key: string; value: string }>,
  targetLanguage: string,
  onProgress?: (progress: number) => void
): Promise<Array<{ key: string; value: string }>> {
  const total = pairs.length;
  const results = [];
  
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const translatedValue = await translateText({
      text: pair.value,
      targetLanguage
    });
    
    results.push({
      key: pair.key,
      value: translatedValue
    });
    
    // Report progress
    if (onProgress) {
      onProgress((i + 1) / total * 100);
    }
  }
  
  return results;
}