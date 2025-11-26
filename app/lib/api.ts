// Базовый API клиент
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  get(endpoint: string) {
    return this.request(endpoint);
  }

  post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint: string) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Инициализация API клиента
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api');

// Специфичные API методы для поиска маршрутов
export const searchApi = {
  searchRoutes: (params: {
    from: string;
    to: string;
    date: string;
    passengers?: number;
  }) => apiClient.post('/search/routes', params),
  getRouteDetails: (routeId: string) => apiClient.get(`/search/routes/${routeId}`),
};

// API методы для бронирования
export const bookingApi = {
  createBooking: (data: {
    routeId: string;
    passengerData: any;
  }) => apiClient.post('/booking', data),
  getBooking: (bookingId: string) => apiClient.get(`/booking/${bookingId}`),
  updateBooking: (bookingId: string, data: any) => 
    apiClient.put(`/booking/${bookingId}`, data),
};

// API методы для страховки
export const insuranceApi = {
  getInsurancePlans: (bookingId: string) => 
    apiClient.get(`/insurance/plans?bookingId=${bookingId}`),
  selectInsurance: (bookingId: string, planId: string) =>
    apiClient.post('/insurance/select', { bookingId, planId }),
};

// API методы для выбора места
export const seatApi = {
  getAvailableSeats: (segmentId: string) =>
    apiClient.get(`/seats/available?segmentId=${segmentId}`),
  selectSeat: (segmentId: string, seatId: string) =>
    apiClient.post('/seats/select', { segmentId, seatId }),
};

// API методы для оплаты
export const paymentApi = {
  createPayment: (bookingId: string, paymentMethod: string) =>
    apiClient.post('/payment/create', { bookingId, paymentMethod }),
  confirmPayment: (paymentId: string) =>
    apiClient.post(`/payment/${paymentId}/confirm`, {}),
};

// API методы для подтверждения
export const confirmationApi = {
  getConfirmation: (bookingId: string) =>
    apiClient.get(`/confirmation/${bookingId}`),
};

