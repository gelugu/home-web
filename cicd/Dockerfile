FROM node:16.15.0-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV production
RUN npm run build
RUN npm run export

FROM nginx:1.23.3

EXPOSE 80

COPY --from=builder /app/out /usr/share/nginx/html
COPY --from=builder /app/cicd/nginx.conf /etc/nginx/nginx.conf
