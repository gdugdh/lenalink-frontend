# Интеграция с Backend API

## Обзор

Фронтенд интегрирован с Backend API LenaLink (http://localhost:8080/api/v1).

## Что было сделано

### 1. API Клиент (`app/lib/backend-api.ts`)
- Создан полнофункциональный API клиент для работы с бэкендом
- Поддержка JWT токенов (автоматическое добавление в заголовки)
- Хранение токена в localStorage
- Типизация всех запросов и ответов

### 2. Аутентификация
- Обновлен `AuthContext` для работы с реальным API
- Интеграция с `/api/login` и `/api/register`
- Токен сохраняется в localStorage и автоматически добавляется в запросы

### 3. Поиск маршрутов
- `SearchPageClient` загружает маршруты из `/api/v1/routes/search`
- Преобразование данных бэкенда в формат фронтенда
- Отображение реальных маршрутов в `SearchResults`

### 4. Создание бронирований
- `PaymentPageClient` создает бронирования через `/api/v1/bookings`
- Сбор данных пассажира из `BookingForm`
- Преобразование данных в формат API
- Сохранение `bookingId` в контекст

### 5. Booking Context
- Добавлено хранение данных пассажира (`passengerData`)
- Добавлено хранение ID бронирования (`bookingId`)
- Сохранение выбранного маршрута (`selectedRoute`)

## Настройка

### Переменные окружения

Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

По умолчанию используется `http://localhost:8080`.

## Использование

### Аутентификация

```typescript
import { useAuth } from '@/app/context/AuthContext';

const { login, register, logout, session, token } = useAuth();

// Вход
await login('user@example.com', 'password');

// Регистрация
await register('user@example.com', 'password', 'Иван Иванов', 'user');

// Выход
await logout();
```

### Поиск маршрутов

```typescript
import { backendApi } from '@/app/lib/backend-api';

const response = await backendApi.searchRoutes({
  from: 'moscow',
  to: 'yakutsk',
  departure_date: '2025-06-20',
  passengers: 1,
});
```

### Создание бронирования

```typescript
import { backendApi } from '@/app/lib/backend-api';

const booking = await backendApi.createBooking({
  route_id: 'route_abc123',
  passenger: {
    first_name: 'Иван',
    last_name: 'Петров',
    middle_name: 'Сергеевич',
    date_of_birth: '1990-05-15',
    passport_number: '1234 567890',
    email: 'ivan@example.com',
    phone: '+79001234567',
  },
  include_insurance: true,
  payment_method: 'card',
});
```

## Формат данных

### Преобразование маршрутов

Backend возвращает маршруты в формате:
```typescript
{
  id: string;
  type: 'optimal' | 'fastest' | 'cheapest';
  segments: RouteSegment[];
  total_price: number;
  // ...
}
```

Фронтенд преобразует их в `RouteData`:
```typescript
{
  id: string;
  badge: string;
  price: string;
  departureCity: string;
  arrivalCity: string;
  // ...
}
```

## Важные замечания

1. **Токен аутентификации**: Токен автоматически сохраняется в localStorage и добавляется в заголовки всех запросов к защищенным эндпоинтам.

2. **Формат городов**: Бэкенд ожидает названия городов в формате lowercase без пробелов (например, `moscow`, `yakutsk`). Фронтенд преобразует названия автоматически.

3. **Даты**: Используется формат ISO 8601 (YYYY-MM-DD) для дат отправления.

4. **Ошибки**: Все ошибки API обрабатываются и отображаются пользователю через toast уведомления.

## Следующие шаги

- [ ] Интегрировать поиск городов через `/api/v1/cities` в `SearchBar`
- [ ] Добавить загрузку деталей маршрута через `/api/v1/routes/{id}`
- [ ] Интегрировать получение списка бронирований через `/api/my_routes`
- [ ] Добавить отмену бронирований через `/api/v1/bookings/{id}/cancel`
- [ ] Добавить обработку webhook'ов от YooKassa

