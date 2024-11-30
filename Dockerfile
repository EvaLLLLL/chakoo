# Build stage
FROM node:20-slim AS builder

# Install Python and build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.11.0 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/tailwind-config/package.json ./packages/tailwind-config/
COPY packages/ui/package.json ./packages/ui/
COPY packages/lib/package.json ./packages/lib/
COPY contracts/package.json ./contracts/
COPY app/package.json ./app/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy the built files from builder stage to nginx
COPY --from=builder /app/app/dist /var/www/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
