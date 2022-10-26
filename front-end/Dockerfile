FROM node:16.13.1
WORKDIR /home/node/app

COPY package.json .
ADD . .
RUN npm install
EXPOSE 8080

CMD ["npm", "run", "serve"]