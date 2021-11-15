FROM node:16-alpine3.13 as base

RUN mkdir -p /app
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
COPY . /app

RUN yarn cache clean && rm -rf node_modules && \
  NODE_ENV=${NODE_ENV} yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:16-alpine3.13
ENV NODE_ENV $NODE_ENV
WORKDIR /app
COPY --from=base /app .
WORKDIR /app
CMD ["echo", "hi"]
