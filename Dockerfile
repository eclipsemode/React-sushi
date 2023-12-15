FROM node:20-slim
RUN corepack enable
WORKDIR /app
COPY . .
RUN pnpm install
CMD ["pnpm", "run", "dev"]
EXPOSE 3000