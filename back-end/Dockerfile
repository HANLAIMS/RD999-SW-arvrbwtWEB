FROM node:16.13.1
WORKDIR /home/node/app

COPY package.json .
ADD . .
RUN npm install
EXPOSE 3000

CMD ["npm", "run", "serve"]