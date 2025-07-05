FROM node:20-alpine

WORKDIR /app

# Copy only dependencies (per context)
COPY package*.json ./
RUN npm install --only=production

# Copy service code from that specific context
COPY . .

# Default command (will be overridden in docker-compose)
CMD ["npm", "run", "start"]