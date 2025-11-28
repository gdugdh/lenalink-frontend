/**
 * Сервис для работы с маршрутами
 */

import { BaseApiService } from './base-api.service';
import type { RoutesSearchResponse, RouteDetailsResponse } from '../backend-api';

export class RoutesApiService extends BaseApiService {
  async healthCheck(): Promise<{
    status: string;
    version: string;
    timestamp: string;
  }> {
    return this.request('/api/v1/health');
  }

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
}

