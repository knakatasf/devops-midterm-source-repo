FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g nodemon

COPY . .

RUN chmod -R 777 /app

EXPOSE 8800

CMD ["npx", "nodemon", "index.js"]
