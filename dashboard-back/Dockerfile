FROM node:14-alpine AS build

COPY . /app
WORKDIR /app

RUN npm i
RUN npm run build

ENTRYPOINT npm run start:prod
