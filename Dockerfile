FROM node:21-alpine3.18
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN npm install
RUN npm run build
CMD [ "npm", "start"]