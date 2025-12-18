# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm ci --only=development
RUN npx tsc

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Копируем только production-зависимости и скомпилированный код
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Порт, который будет слушать контейнер
EXPOSE 3001

# Запуск
CMD ["node", "dist/server.js"]