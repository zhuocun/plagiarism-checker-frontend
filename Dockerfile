FROM node
WORKDIR /app
COPY Front-end/package.json /app/
RUN npm install
COPY Front-end/. /app/
CMD ["npm", "start"]