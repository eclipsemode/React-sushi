FROM node:20.9.0-alpine
RUN apk add --no-cache python3 py3-pip make g++
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["yarn", "run", "dev"]
EXPOSE 3000