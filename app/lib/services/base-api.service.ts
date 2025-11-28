/**
 * Базовый класс для всех API сервисов
 * Содержит общую логику для выполнения HTTP запросов
 */

export class BaseApiService {
  protected baseURL: string;
  protected token: string | null = null;

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
        // Обработка сетевых ошибок (CORS, недоступный сервер и т.д.)
        let errorMessage = 'Неизвестная ошибка сети';
        
        if (fetchError instanceof Error) {
          errorMessage = fetchError.message;
        } else if (typeof fetchError === 'string') {
          errorMessage = fetchError;
        } else if (fetchError && typeof fetchError === 'object') {
          // Пытаемся извлечь сообщение из объекта ошибки
          errorMessage = (fetchError as any).message || (fetchError as any).toString() || 'Ошибка сети';
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

        // Определяем тип ошибки и выбрасываем понятное сообщение
        if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError') || errorMessage === 'Failed to fetch') {
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
}

