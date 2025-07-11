# Use Node.js official image
FROM node:20

# Install ffmpeg and yt-dlp
RUN apt-get update && apt-get install -y ffmpeg yt-dlp

# Create app directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# Copy rest of your code
COPY . .

# Build (if you use "build", else comment out)
RUN pnpm run build

# Expose your app's port (default 3000 for Express)
EXPOSE 3000

# Start your app
CMD ["pnpm", "run", "start"]
