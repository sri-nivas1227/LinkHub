# Dependencies
FROM node:alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build
FROM node:alpine AS builder
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Runtime
FROM node:alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Standalone mode only needs these specific files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
# Run the standalone server directly (much faster/lighter)
CMD ["node", "server.js"]