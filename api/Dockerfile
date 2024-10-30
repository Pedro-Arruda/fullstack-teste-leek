FROM node:22.11-alpine3.20 AS base
RUN corepack enable
WORKDIR /usr/app
COPY . . 

FROM base as build
RUN pnpm install --ignore-scripts --frozen-lockfile
RUN pnpm build

FROM build as prod-deps
RUN pnpm prisma generate
RUN pnpm install --prod --ignore-scripts --frozen-lockfile

FROM base 
COPY --from=build /usr/app/dist /usr/app/dist
COPY --from=prod-deps /usr/app/node_modules /usr/app/node_modules

EXPOSE ${API_PORT}
CMD ["/bin/sh", "-c", "pnpm prisma migrate deploy && pnpm start"]
