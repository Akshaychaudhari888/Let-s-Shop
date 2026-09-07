# ----------------------------------------------------
# Stage 1: Build & Dependencies
# ----------------------------------------------------
FROM node:20-alpine AS deps

# Set working directory
WORKDIR /app

# Install build tools required for native modules like bcrypt
RUN apk add --no-cache python3 make g++

# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# ----------------------------------------------------
# Stage 2: Production Execution Image
# ----------------------------------------------------
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Create uploads directory and set permissions for non-root node user
RUN mkdir -p /app/uploads && chown -R node:node /app

# Copy installed production dependencies from deps stage
COPY --chown=node:node --from=deps /app/node_modules ./node_modules

# Copy application source files
COPY --chown=node:node . .

# Use non-root node user for enhanced container security
USER node

# Expose backend application port
EXPOSE 5000

# Health check to ensure service health on EC2 / Load Balancers
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:' + (process.env.PORT || 5000) + '/test').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Start Express server
CMD ["node", "server.js"]