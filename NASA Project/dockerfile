FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --only=production

COPY client/package.json client/
RUN npm run install-client

COPY server/package.json server/
RUN npm run install-server

COPY client/ client/
COPY server/ server/
RUN npm run build --prefix client

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 3000