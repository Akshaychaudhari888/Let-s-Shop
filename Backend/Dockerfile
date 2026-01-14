FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV DB_HOST=host.docker.internal
ENV DB_PORT=27017
ENV DB_NAME=mydb

EXPOSE 3000

CMD ["npm", "start"]
