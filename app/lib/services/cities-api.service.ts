/**
 * Сервис для работы с городами
 */

import { BaseApiService } from './base-api.service';
import type { City } from '../backend-api';

export class CitiesApiService extends BaseApiService {
  async searchCities(name: string): Promise<{ cities: City[] }> {
    return this.request(`/api/v1/cities?name=${encodeURIComponent(name)}`);
  }
}

