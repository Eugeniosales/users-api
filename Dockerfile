FROM node:12.14.1

WORKDIR /opt/app

COPY . ./

RUN npm install

CMD ["npm", "start"]