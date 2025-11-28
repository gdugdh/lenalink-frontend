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
    const response = await this.request<{ data: BackendAuthResponse; success: boolean }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Извлекаем данные из обертки
    const authData = response.data;

    // Сохраняем токен
    if (authData.token) {
      this.setToken(authData.token);
    }
    return authData;
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<BackendAuthResponse> {
    const response = await this.request<{ data: BackendAuthResponse; success: boolean }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Извлекаем данные из обертки
    const authData = response.data;

    // Сохраняем токен
    if (authData.token) {
      this.setToken(authData.token);
    }
    return authData;
  }
}

