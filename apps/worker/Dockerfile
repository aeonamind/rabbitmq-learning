FROM oven/bun:1.1.20-slim AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lockb ./
COPY apps/worker/package.json ./apps/worker/package.json
COPY packages ./packages
RUN bun install
RUN bun install --frozen-lockfile --production

FROM base AS release
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY tsconfig.json .
COPY packages ./packages
COPY apps/worker/tsconfig.json ./apps/worker/tsconfig.json
COPY apps/worker/src ./apps/worker/src
ENTRYPOINT [ "bun", "run", "apps/worker/src/main.ts" ]