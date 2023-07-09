FROM nginx:alpine
COPY ./dist /app

RUN rm /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/
