# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install

ARG configuration=production
RUN npm run build -- --output-path=./dist --configuration $configuration   --extract-css=true --sourceMap=false  --vendor-chunk=true 
# RUN npm run build --environment=$env

# stage 2do
FROM nginx:alpine
RUN rm  /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist /usr/share/nginx/html

