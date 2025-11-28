/**
 * Backend API Client для работы с LenaLink Backend API
 * Base URL: https://lena.linkpc.net
 * API endpoints: /api/v1/* (routes, bookings, cities) и /api/* (auth)
 * 
 * Этот файл теперь является фасадом, который объединяет все API сервисы
 */

import { AuthApiService } from './services/auth-api.service';
import { RoutesApiService } from './services/routes-api.service';
import { BookingsApiService } from './services/bookings-api.service';
import { CitiesApiService } from './services/cities-api.service';

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
  data?: {
    routes: Route[];
    search_criteria: {
      from: string;
      to: string;
      departure_date: string;
      passengers: number;
    };
  };
  routes?: Route[];
  search_criteria?: {
    from: string;
    to: string;
    departure_date: string;
    passengers: number;
  };
  success?: boolean;
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
  private authApi: AuthApiService;
  private routesApi: RoutesApiService;
  private bookingsApi: BookingsApiService;
  private citiesApi: CitiesApiService;

  constructor(baseURL: string) {
    this.authApi = new AuthApiService(baseURL);
    this.routesApi = new RoutesApiService(baseURL);
    this.bookingsApi = new BookingsApiService(baseURL);
    this.citiesApi = new CitiesApiService(baseURL);
  }

  // Управление токеном - синхронизируем между всеми сервисами
  setToken(token: string | null) {
    this.authApi.setToken(token);
    this.routesApi.setToken(token);
    this.bookingsApi.setToken(token);
    this.citiesApi.setToken(token);
  }

  getToken(): string | null {
    return this.authApi.getToken();
  }

  // Auth endpoints - делегируем AuthApiService
  async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<BackendAuthResponse> {
    const response = await this.authApi.register(data);
    // Синхронизируем токен со всеми сервисами
    this.setToken(response.token);
    return response;
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<BackendAuthResponse> {
    const response = await this.authApi.login(data);
    // Синхронизируем токен со всеми сервисами
    this.setToken(response.token);
    return response;
  }

  // Health check - делегируем RoutesApiService
  async healthCheck(): Promise<{
    status: string;
    version: string;
    timestamp: string;
  }> {
    return this.routesApi.healthCheck();
  }

  // Cities - делегируем CitiesApiService
  async searchCities(name: string): Promise<{ cities: City[] }> {
    return this.citiesApi.searchCities(name);
  }

  // Routes - делегируем RoutesApiService
  async searchRoutes(params: {
    from: string;
    to: string;
    departure_date: string;
    passengers?: number;
  }): Promise<RoutesSearchResponse> {
    return this.routesApi.searchRoutes(params);
  }

  async getRouteDetails(routeId: string): Promise<RouteDetailsResponse> {
    return this.routesApi.getRouteDetails(routeId);
  }

  // Bookings - делегируем BookingsApiService
  async createBooking(data: BookingRequest): Promise<Booking> {
    return this.bookingsApi.createBooking(data);
  }

  async getBooking(bookingId: string): Promise<Booking> {
    return this.bookingsApi.getBooking(bookingId);
  }

  async getMyBookings(): Promise<{ bookings: Booking[]; total: number }> {
    return this.bookingsApi.getMyBookings();
  }

  async getAllBookings(params?: {
    status?: string;
    email?: string;
  }): Promise<{ bookings: Booking[]; total: number }> {
    return this.bookingsApi.getAllBookings(params);
  }

  async cancelBooking(
    bookingId: string,
    reason: string
  ): Promise<Booking> {
    return this.bookingsApi.cancelBooking(bookingId, reason);
  }
}

// Экспортируем singleton instance
export const backendApi = new BackendApiClient(BACKEND_BASE_URL);

