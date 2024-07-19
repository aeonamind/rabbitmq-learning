FROM oven/bun:1.1.20-slim AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lockb ./
COPY apps/orchestrator/package.json ./apps/orchestrator/package.json
COPY packages ./packages
RUN bun install
RUN bun install --frozen-lockfile --production

FROM base AS release
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY tsconfig.json .
COPY packages ./packages
COPY apps/orchestrator/tsconfig.json ./apps/orchestrator/tsconfig.json
COPY apps/orchestrator/src ./apps/orchestrator/src
ENTRYPOINT [ "bun", "run", "apps/orchestrator/src/main.ts" ]