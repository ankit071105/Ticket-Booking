FROM node:18

WORKDIR /app 

COPY package*.json . 

RUN npm install

COPY . .

EXPOSE 7865

CMD ["npm", "start"]