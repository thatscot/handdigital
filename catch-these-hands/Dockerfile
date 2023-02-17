FROM node:alpine as base
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm cache clear --force
RUN npm install --legacy-peer-deps
RUN npm run build

FROM duluca/minimal-node-web-server as final
WORKDIR /usr/src/app
COPY --from=base /usr/app/dist public