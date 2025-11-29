FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
RUN corepack enable && pnpm install --frozen-lockfile --prefer-offline
COPY . .
RUN pnpm build && pnpm postbuild

FROM node:18-alpine AS runner
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/.out ./.out
COPY --from=builder /app/package.json ./package.json
ENV PORT=3000
EXPOSE 3000
CMD ["sh", "-c", "serve -s .out -l $PORT"]
