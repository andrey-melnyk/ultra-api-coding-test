FROM node:12

USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH="/home/node/.npm-global/bin:$PATH"

WORKDIR /home/node/app

RUN npm i -g npm

RUN npm i -g @nestjs/cli
