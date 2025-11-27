FROM node:20-alpine

WORKDIR /app

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml* ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем весь проект
COPY . .

# Открываем порт
EXPOSE 3000

# Запускаем в режиме разработки
CMD ["pnpm", "dev"]

