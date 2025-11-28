/**
 * Сервис для работы с бронированиями
 */

import { BaseApiService } from './base-api.service';
import type { Booking, BookingRequest } from '../backend-api';

export class BookingsApiService extends BaseApiService {
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

