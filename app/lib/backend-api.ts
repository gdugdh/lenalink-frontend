/**
 * Backend API Client для работы с LenaLink Backend API
 * Base URL: https://lena.linkpc.net
 * API endpoints: /api/v1/* (routes, bookings, cities) и /api/* (auth)
 */

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://lena.linkpc.net';

// Типы для API
export interface BackendUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
  last_login_at: string | null;
}

export interface BackendAuthResponse {
  token: string;
  user: BackendUser;
}

export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface RouteSegment {
  id: string;
  transport_type: 'air' | 'rail' | 'bus' | 'river' | 'taxi' | 'walk';
  provider: string;
  from: {
    id: string;
    name: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  to: {
    id: string;
    name: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  departure_time: string;
  arrival_time: string;
  duration: string;
  price: number;
  distance: number;
  seat_count: number;
  reliability_rate: number;
}

export interface Route {
  id: string;
  type: 'optimal' | 'fastest' | 'cheapest';
  segments: RouteSegment[];
  total_price: number;
  total_distance: number;
  total_duration: string;
  reliability_score: number;
  geojson?: {
    type: 'FeatureCollection';
    features: Array<{
      type: 'Feature';
      geometry: {
        type: 'LineString';
        coordinates: number[][];
      };
      properties: {
        type: string;
        distance: number;
        price: number;
      };
    }>;
  };
}

export interface RoutesSearchResponse {
  routes: Route[];
  search_criteria: {
    from: string;
    to: string;
    departure_date: string;
    passengers: number;
  };
}

export interface RouteDetailsResponse extends Route {
  commission_breakdown: {
    base_price: number;
    commission: number;
    grand_total: number;
    segments: Array<{
      segment_id: string;
      transport_type: string;
      base_price: number;
      commission_rate: number;
      commission: number;
      total: number;
    }>;
  };
  insurance_available: boolean;
  insurance_premium?: number;
  insurance_breakdown?: {
    base_premium: number;
    tight_connection_surcharge: number;
    night_flight_surcharge: number;
    river_transport_surcharge: number;
    total: number;
  };
}

export interface Passenger {
  first_name: string;
  last_name: string;
  middle_name?: string;
  date_of_birth: string;
  passport_number: string;
  email: string;
  phone: string;
}

export interface BookingRequest {
  route_id: string;
  passenger: Passenger;
  include_insurance?: boolean;
  payment_method: 'card' | 'yookassa' | 'cloudpay' | 'sberpay';
}

export interface BookingSegment {
  id: string;
  segment_id: string;
  provider: string;
  transport_type: string;
  from: {
    name: string;
    city: string;
  };
  to: {
    name: string;
    city: string;
  };
  departure_time: string;
  arrival_time: string;
  ticket_number: string;
  price: number;
  commission: number;
  total_price: number;
  booking_status: string;
  provider_booking_ref: string;
}

export interface Booking {
  id: string;
  route_id: string;
  status: 'pending' | 'pending_payment' | 'in_progress' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  passenger: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  segments: BookingSegment[];
  total_price: number;
  total_commission: number;
  insurance_premium?: number;
  grand_total: number;
  include_insurance: boolean;
  payment: {
    id: string;
    order_id: string;
    amount: number;
    currency: string;
    method: string;
    status: string;
    provider_payment_id: string;
    created_at: string;
    completed_at?: string;
  };
  created_at: string;
  confirmed_at?: string;
}

class BackendApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Загружаем токен из localStorage при инициализации
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

  private async request<T>(
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
        // Обработка сетевых ошибок (CORS, недоступный сервер и т.д.)
        const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
        
        if (process.env.NODE_ENV === 'development') {
          console.error('Network error (fetch failed):', {
            url: url,
            endpoint: endpoint,
            method: options.method || 'GET',
            error: errorMessage,
            errorObject: fetchError,
          });
        }

        // Определяем тип ошибки и выбрасываем понятное сообщение
        if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
          throw new Error('Не удалось подключиться к серверу. Проверьте подключение к интернету или попробуйте позже.');
        } else if (errorMessage.includes('CORS')) {
          throw new Error('Ошибка CORS. Сервер не разрешает запросы с этого домена.');
        } else {
          throw new Error(`Ошибка сети: ${errorMessage}`);
        }
      }

      // Обработка ошибок HTTP
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          // Если ответ не JSON, создаем объект ошибки
          errorData = {
            error: {
              code: 'HTTP_ERROR',
              message: `HTTP ${response.status}: ${response.statusText}`,
            },
          };
        }

        // Извлекаем сообщение об ошибке
        const errorMessage = errorData.error?.message || 
                            errorData.message || 
                            `HTTP error! status: ${response.status}`;

        // Логируем ошибку только в режиме разработки
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

      // Парсинг JSON ответа
      try {
        return await response.json();
      } catch (jsonError) {
        // Ошибка парсинга JSON
        if (process.env.NODE_ENV === 'development') {
          console.error('JSON parse error:', {
            url: url,
            endpoint: endpoint,
            method: options.method || 'GET',
            status: response.status,
            error: jsonError instanceof Error ? jsonError.message : String(jsonError),
          });
        }
        throw new Error('Сервер вернул некорректный ответ. Попробуйте позже.');
      }
    } catch (error) {
      // Если это уже наша обработанная ошибка, просто пробрасываем её
      if (error instanceof Error) {
        // Проверяем, не является ли это уже обработанной ошибкой
        const processedErrors = [
          'Не удалось подключиться к серверу',
          'Ошибка CORS',
          'Ошибка сети',
          'Сервер вернул некорректный ответ',
        ];
        
        if (processedErrors.some(msg => error.message.includes(msg))) {
          throw error;
        }
        
        // Если это ошибка из обработки HTTP, тоже пробрасываем
        if (error.message.includes('HTTP error') || error.message.length > 0) {
          throw error;
        }
      }
      
      // Иначе это необработанная ошибка
      if (process.env.NODE_ENV === 'development') {
        console.error('API request failed (unhandled error):', {
          url: url,
          endpoint: endpoint,
          method: options.method || 'GET',
          error: error instanceof Error ? error.message : String(error),
          errorObject: error,
        });
      }
      throw new Error('Произошла ошибка при выполнении запроса');
    }
  }

  // Auth endpoints
  async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<BackendAuthResponse> {
    const response = await this.request<BackendAuthResponse>('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    // Сохраняем токен
    if (response.token) {
      this.setToken(response.token);
    }
    return response;
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<BackendAuthResponse> {
    const response = await this.request<BackendAuthResponse>('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    // Сохраняем токен
    if (response.token) {
      this.setToken(response.token);
    }
    return response;
  }

  // Health check
  async healthCheck(): Promise<{
    status: string;
    version: string;
    timestamp: string;
  }> {
    return this.request('/api/v1/health');
  }

  // Cities
  async searchCities(name: string): Promise<{ cities: City[] }> {
    return this.request(`/api/v1/cities?name=${encodeURIComponent(name)}`);
  }

  // Routes
  async searchRoutes(params: {
    from: string;
    to: string;
    departure_date: string;
    passengers?: number;
  }): Promise<RoutesSearchResponse> {
    return this.request('/api/v1/routes/search', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getRouteDetails(routeId: string): Promise<RouteDetailsResponse> {
    return this.request(`/api/v1/routes/${routeId}`);
  }

  // Bookings
  async createBooking(data: BookingRequest): Promise<Booking> {
    return this.request('/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBooking(bookingId: string): Promise<Booking> {
    return this.request(`/api/v1/bookings/${bookingId}`);
  }

  async getMyBookings(): Promise<{ bookings: Booking[]; total: number }> {
    return this.request('/api/my_routes');
  }

  async getAllBookings(params?: {
    status?: string;
    email?: string;
  }): Promise<{ bookings: Booking[]; total: number }> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.email) queryParams.append('email', params.email);
    const query = queryParams.toString();
    return this.request(`/api/v1/bookings${query ? `?${query}` : ''}`);
  }

  async cancelBooking(
    bookingId: string,
    reason: string
  ): Promise<Booking> {
    return this.request(`/api/v1/bookings/${bookingId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }
}

// Экспортируем singleton instance
export const backendApi = new BackendApiClient(BACKEND_BASE_URL);

