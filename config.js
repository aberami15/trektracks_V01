// config.js
const Config = {
    // Base URL for all API calls
    BASE_URL: 'http://10.31.25.1:5000',
    
    // API endpoints
    API_ENDPOINTS: {
      // Auth endpoints
      AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        GET_USER: '/api/auth/user',
      },
      
      // Places endpoints
      PLACES: {
        GET_ALL: '/api/places',
        SEARCH: '/api/places/search',
        GET_BY_ID: '/api/places',
        GET_BY_CATEGORY: '/api/places/category',
        GET_POPULAR: '/api/places/popular',
      },
      
      // Trips endpoints
      TRIPS: {
        GET_ALL: '/api/trips',
        GET_USER_TRIPS: '/api/trips/mytrip',
        GET_BY_ID: '/api/trips',
        CREATE: '/api/trips',
        UPDATE: '/api/trips',
        DELETE: '/api/trips',
      },
      
      // AI endpoints
      AI: {
        GENERATE_PLAN: '/api/ai/generate-plan',
        ANALYZE_TRIP: '/api/ai/analyze-trip',
        AI_PLAN_GENERATE: '/api/ai-plan/generate',
        AI_PLAN_GET: '/api/ai-plan',
        GEMINI_GENERATE_PLAN: '/api/gemini/generate-plan',
      },
      
      // Expenses endpoints
      EXPENSES: {
        GET_ALL: '/api/expenses',
        GET_STATS: '/api/expenses/stats',
        GET_TRIP_EXPENSES: '/api/expenses/trip',
        GET_BY_ID: '/api/expenses',
        CREATE: '/api/expenses',
        UPDATE: '/api/expenses',
        DELETE: '/api/expenses',
      },
    },
    
    // Default API request options
    DEFAULT_OPTIONS: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
  
  export default Config;