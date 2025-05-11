
/**
 * Utility functions for accessing API keys and configurations
 */

export const getGeminiApiKey = (): string => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn('Gemini API key is not set in .env file');
    return '';
  }
  
  return apiKey;
};

export const getStabilityApiKey = (): string => {
  const apiKey = import.meta.env.VITE_STABILITY_API_KEY;
  
  if (!apiKey) {
    console.warn('Stability API key is not set in .env file');
    return '';
  }
  
  return apiKey;
};
