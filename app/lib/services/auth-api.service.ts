/**
 * Сервис для работы с аутентификацией
 */

import { BaseApiService } from './base-api.service';
import type { BackendAuthResponse } from '../backend-api';

export class AuthApiService extends BaseApiService {
  async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<BackendAuthResponse> {
    const response = await this.request<BackendAuthResponse>('/api/auth/register', {
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
}

