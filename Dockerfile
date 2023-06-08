FROM node:14
WORKDIR /app
EXPOSE 3000
ENV NODE_ENV=dev
COPY . .
COPY .env.example .env
RUN npm install
# RUN npm run migrate:run
CMD [ "npm", "run", "dev" ]