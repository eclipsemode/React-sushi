FROM node

WORKDIR /app

COPY package.json /app

ENV PORT 5000

RUN npm install

COPY . .

EXPOSE $PORT

CMD [ "node", "index.js" ]