FROM node:latest

WORKDIR ./usr/app

COPY ./package*.json ./

RUN yarn install

COPY ./ ./

# Create a volume
# VOLUME ['/app/data']

CMD ["yarn", "start"]