# Multi-Stage Dockerfile for SmartLearn TV

# Stage 1: Build the React 19 Frontend
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Server
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

COPY package*.json ./
RUN npm install --omit=dev

COPY server/ ./server/
COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["node", "server/index.js"]
