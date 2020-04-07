FROM mhart/alpine-node:latest
# Create app directory
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*
  
RUN ["mkdir", "-p", "/logs/emailingservice/development"]


COPY package*.json ./
COPY gulpfile.js ./

RUN mkdir -p ~/secretes

RUN npm install -g gulp
RUN npm install express gulp --s
RUN npm install

COPY . ./
RUN gulp build

CMD ["npm","start"]