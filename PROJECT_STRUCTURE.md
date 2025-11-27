# Структура файлов системы аутентификации LenaLink

## Дерево файлов проекта

```
app/
├── auth/
│   ├── login/
│   │   ├── page.tsx                 # Серверный компонент страницы логина
│   │   └── LoginClient.tsx          # Клиентский компонент с формой входа
│   └── register/
│       ├── page.tsx                 # Серверный компонент страницы регистрации
│       └── RegisterClient.tsx       # Многошаговая форма регистрации (2 шага)
│
├── dashboard/
│   └── [role]/                      # Динамический маршрут для ролей
│       ├── page.tsx                 # Серверный компонент с проверкой роли
│       ├── DashboardClient.tsx      # Клиентский роутер к нужному дашборду
│       ├── UserDashboard.tsx        # Личный кабинет пользователя
│       ├── AdminDashboard.tsx       # Личный кабинет администратора
│       └── PartnerDashboard.tsx     # Личный кабинет партнёра
│
├── api/
│   └── auth/
│       ├── login/
│       │   └── route.ts             # POST /api/auth/login
│       ├── register/
│       │   └── route.ts             # POST /api/auth/register
│       ├── logout/
│       │   └── route.ts             # POST /api/auth/logout
│       └── session/
│           └── route.ts             # GET /api/auth/session
│
├── context/
│   └── AuthContext.tsx              # React Context + Provider для управления сессией
│
├── lib/
│   ├── auth.ts                      # Серверные функции аутентификации:
│   │                                #   - loginMock()
│   │                                #   - registerMock()
│   │                                #   - getSession()
│   │                                #   - requireAuth()
│   │                                #   - requireRole()
│   │                                #   - createSession()
│   │                                #   - clearSession()
│   │                                #   - getSessionClient()
│   └── mockUsers.ts                 # MOCK_USERS массив с тестовыми аккаунтами
│
├── components/
│   └── ui/                          # Shadcn/ui компоненты (уже установлены)
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── table.tsx
│       ├── badge.tsx
│       ├── skeleton.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── avatar.tsx
│       ├── progress.tsx
│       ├── separator.tsx
│       ├── radio-group.tsx
│       └── ... (другие компоненты)
│
├── layout.tsx                       # Root layout с AuthProvider и Toaster
├── middleware.ts                    # Защита маршрутов и проверка ролей
└── ... (другие файлы проекта)

AUTHENTICATION_README.md             # Подробная документация
PROJECT_STRUCTURE.md                 # Этот файл
```

## Ключевые файлы

### Аутентификация

1. **`app/lib/auth.ts`** — Серверные функции аутентификации
   - `loginMock()` — проверка креденшелов против MOCK_USERS
   - `registerMock()` — создание нового пользователя
   - `getSession()` — получение сессии из cookie (server-side)
   - `requireAuth()` — защита маршрута (требует авторизации)
   - `requireRole(role)` — защита маршрута (требует конкретную роль)

2. **`app/context/AuthContext.tsx`** — Клиентское управление сессией
   - `AuthProvider` — провайдер контекста
   - `useAuth()` — хук для доступа к сессии
   - Методы: `login()`, `register()`, `logout()`, `refreshSession()`, `hasRole()`

3. **`middleware.ts`** — Защита маршрутов
   - Проверка авторизации для защищённых маршрутов
   - Редирект на `/auth/login` при отсутствии сессии
   - Проверка соответствия роли запрашиваемому дашборду
   - Автоматический редирект авторизованных пользователей с `/auth/*` на дашборд

### Страницы

4. **`app/auth/login/LoginClient.tsx`** — Форма входа
   - Поля: email, password
   - Выбор роли для демо (опционально)
   - Валидация
   - Редирект на соответствующий дашборд

5. **`app/auth/register/RegisterClient.tsx`** — Многошаговая регистрация
   - Шаг 1: Выбор роли (user/admin/partner)
   - Шаг 2: Заполнение данных (имя, email, пароль)
   - Валидация всех полей
   - Автоматический вход после регистрации

6. **`app/dashboard/[role]/page.tsx`** — Динамический дашборд
   - Серверный компонент с `requireRole()` для защиты
   - Рендерит `DashboardClient` после проверки роли

7. **`app/dashboard/[role]/DashboardClient.tsx`** — Роутинг дашбордов
   - Проверяет соответствие роли пользователя
   - Рендерит нужный компонент: `UserDashboard`, `AdminDashboard`, или `PartnerDashboard`

8. **`app/dashboard/[role]/UserDashboard.tsx`** — Личный кабинет пользователя
   - Отображение баланса (15,000₽)
   - Кнопка "Пополнить"
   - Карточки: "Мои билеты", "История", "Настройки"

9. **`app/dashboard/[role]/AdminDashboard.tsx`** — Личный кабинет администратора
   - Статистика: пользователи, бронирования, выручка
   - Таблица последних пользователей
   - Быстрые действия

10. **`app/dashboard/[role]/PartnerDashboard.tsx`** — Личный кабинет партнёра
    - Статистика: маршруты, бронирования, выручка, рейтинг
    - Таблица последних бронирований
    - Управление маршрутами

### API Routes

11. **`app/api/auth/login/route.ts`** — POST /api/auth/login
    - Принимает: `{ email, password }`
    - Возвращает: `{ message, session }`
    - Устанавливает cookie с сессией

12. **`app/api/auth/register/route.ts`** — POST /api/auth/register
    - Принимает: `{ email, password, name, role }`
    - Возвращает: `{ message, session }`
    - Устанавливает cookie с сессией

13. **`app/api/auth/logout/route.ts`** — POST /api/auth/logout
    - Удаляет cookie с сессией
    - Возвращает: `{ message }`

14. **`app/api/auth/session/route.ts`** — GET /api/auth/session
    - Возвращает текущую сессию из cookie
    - Используется клиентом для проверки авторизации

## Типы данных

```typescript
// app/lib/mockUsers.ts
type UserRole = 'user' | 'admin' | 'partner';

interface MockUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  balance?: number; // Только для роли 'user'
}

// app/lib/auth.ts
interface Session {
  user: {
    id: string;
    email: string;
    role: UserRole;
    name: string;
    balance?: number;
  };
  expiresAt: number;
}
```

## Поток аутентификации

### Логин
1. Пользователь заполняет форму на `/auth/login`
2. Отправляется POST запрос на `/api/auth/login`
3. Сервер проверяет креденшелы через `loginMock()`
4. При успехе создаётся сессия и устанавливается HTTP-only cookie
5. Клиент получает session в ответе и обновляет `AuthContext`
6. Редирект на `/dashboard/[role]`

### Регистрация
1. Пользователь выбирает роль (шаг 1)
2. Пользователь заполняет форму (шаг 2)
3. Отправляется POST запрос на `/api/auth/register`
4. Сервер создаёт пользователя через `registerMock()`
5. При успехе создаётся сессия
6. Автоматический вход и редирект на дашборд

### Защита маршрутов
1. `middleware.ts` проверяет наличие cookie при запросе защищённого маршрута
2. Если нет сессии → редирект на `/auth/login?redirect=/dashboard/...`
3. Если есть сессия, но роль не совпадает → редирект на правильный дашборд
4. Server-side компоненты используют `requireRole()` для дополнительной защиты

### Logout
1. Пользователь нажимает "Выйти"
2. Отправляется POST запрос на `/api/auth/logout`
3. Cookie удаляется
4. `AuthContext` очищает сессию
5. Редирект на главную страницу

