/**
 * Base class for all API services
 * Contains common logic for making HTTP requests
 */

export class BaseApiService {
  protected baseURL: string;
  protected token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Load token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('backend_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('backend_token', token);
      } else {
        localStorage.removeItem('backend_token');
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      let response: Response;
      try {
        response = await fetch(url, config);
      } catch (fetchError) {
        // Handle network errors (CORS, unavailable server, etc.)
        let errorMessage = 'Unknown network error';
        
        if (fetchError instanceof Error) {
          errorMessage = fetchError.message;
        } else if (typeof fetchError === 'string') {
          errorMessage = fetchError;
        } else if (fetchError && typeof fetchError === 'object') {
          // Try to extract message from error object
          errorMessage = (fetchError as any).message || (fetchError as any).toString() || 'Network error';
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.error('Network error (fetch failed):', {
            url: url,
            endpoint: endpoint,
            method: options.method || 'GET',
            error: errorMessage,
            errorType: fetchError instanceof Error ? fetchError.constructor.name : typeof fetchError,
            errorString: String(fetchError),
          });
        }

        // Determine error type and throw a clear message
        if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError') || errorMessage === 'Failed to fetch') {
          throw new Error('Failed to connect to server. Check your internet connection or try again later.');
        } else if (errorMessage.includes('CORS')) {
          throw new Error('CORS error. Server does not allow requests from this domain.');
        } else {
          throw new Error(`Network error: ${errorMessage}`);
        }
      }

      // Handle HTTP errors
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          // If response is not JSON, create error object
          errorData = {
            error: {
              code: 'HTTP_ERROR',
              message: `HTTP ${response.status}: ${response.statusText}`,
            },
          };
        }

        // Extract error message
        const errorMessage = errorData.error?.message || 
                            errorData.message || 
                            `HTTP error! status: ${response.status}`;

        // Log error only in development mode
        if (process.env.NODE_ENV === 'development') {
          console.error('API request failed:', {
            url: url,
            endpoint: endpoint,
            method: options.method || 'GET',
            status: response.status,
            statusText: response.statusText,
            error: errorMessage,
            errorData: errorData,
          });
        }

        throw new Error(errorMessage);
      }

      // Parse JSON response
      try {
        return await response.json();
      } catch (jsonError) {
        // JSON parsing error
        if (process.env.NODE_ENV === 'development') {
          console.error('JSON parse error:', {
            url: url,
            endpoint: endpoint,
            method: options.method || 'GET',
            status: response.status,
            error: jsonError instanceof Error ? jsonError.message : String(jsonError),
          });
        }
        throw new Error('Server returned invalid response. Please try again later.');
      }
    } catch (error) {
      // If this is already our processed error, just rethrow it
      if (error instanceof Error) {
        // Check if this is already a processed error
        const processedErrors = [
          'Failed to connect to server',
          'CORS error',
          'Network error',
          'Server returned invalid response',
        ];
        
        if (processedErrors.some(msg => error.message.includes(msg))) {
          throw error;
        }
        
        // If this is an error from HTTP handling, also rethrow
        if (error.message.includes('HTTP error') || error.message.length > 0) {
          throw error;
        }
      }
      
      // Otherwise this is an unhandled error
      if (process.env.NODE_ENV === 'development') {
        console.error('API request failed (unhandled error):', {
          url: url,
          endpoint: endpoint,
          method: options.method || 'GET',
          error: error instanceof Error ? error.message : String(error),
          errorObject: error,
        });
      }
      throw new Error('An error occurred while executing the request');
    }
  }
}

