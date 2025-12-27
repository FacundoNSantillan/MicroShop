FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "start:prod"]
