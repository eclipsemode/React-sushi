FROM node:18-alpine
RUN apk add --no-cache python3 py3-pip make g++
ENV TZ Europe/Moscow
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["yarn", "run", "dev"]
EXPOSE 3000