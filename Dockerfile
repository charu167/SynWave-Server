FROM node:20 as base
WORKDIR /usr/src/app
COPY package* .
RUN npm install
COPY . .
EXPOSE 3000


FROM base as development
CMD [ "npm", "run", "dev"]

FROM base as production
CMD [ "npm", "run", "start" ]