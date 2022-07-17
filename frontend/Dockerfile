FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY .env ./
COPY ./ ./
EXPOSE 3000
RUN npm install -g npm@8.14.0
CMD ["npm", "run", "start"]