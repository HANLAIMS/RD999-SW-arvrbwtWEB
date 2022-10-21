FROM node:16.13.1
WORKDIR /home/node/app

COPY package.json .
ADD . .
RUN npm install

CMD ["npm", "run", "serve"]