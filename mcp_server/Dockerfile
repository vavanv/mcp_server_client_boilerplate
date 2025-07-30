# Use Node 20 base image
FROM node:24

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Build TypeScript
RUN npm run server:build

# Expose app port
EXPOSE 3100

# Create start script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "Running database migrations..."' >> /app/start.sh && \
    echo 'npx prisma migrate deploy' >> /app/start.sh && \
    echo 'echo "Starting server..."' >> /app/start.sh && \
    echo 'node dist/server/server.js' >> /app/start.sh && \
    chmod +x /app/start.sh

# Run the start script
CMD ["/app/start.sh"]
