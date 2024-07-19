FROM oven/bun:1.1.20-slim AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lockb ./
COPY apps/token-scraper/package.json ./apps/token-scraper/package.json
COPY packages ./packages
RUN bun install
RUN bun install --frozen-lockfile --production

FROM base AS release
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY tsconfig.json .
COPY packages ./packages
COPY apps/token-scraper/tsconfig.json .
COPY apps/token-scraper/tsconfig.json ./apps/token-scraper/tsconfig.json
COPY apps/token-scraper/src ./apps/token-scraper/src
ENTRYPOINT [ "bun", "run", "apps/token-scraper/src/main.ts" ]