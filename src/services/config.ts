
// API configuration
export const BASE_URL = 'http://localhost:8080/api'; // Update this to match your backend URL

// Utility function to simulate API delays (for mock data)
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Flag to determine if we should use mock data as fallback
export const USE_MOCK_FALLBACK = true;
