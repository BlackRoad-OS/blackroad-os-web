FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build and postbuild
RUN pnpm build || (echo "Build failed" && exit 1)

FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g serve@14

COPY --from=builder /app/.out ./.out

ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "serve -s .out --listen $PORT"]
