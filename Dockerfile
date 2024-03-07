FROM node:16.13 AS builder

WORKDIR /var/erp/

COPY . .

RUN yarn install --ignore-engines
RUN yarn build
RUN ls -l


FROM klakegg/hugo:latest

WORKDIR /src
COPY . .
COPY --from=builder /var/erp/static/ /src/static/
RUN ls -l /src
