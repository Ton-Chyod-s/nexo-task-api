FROM node:22.14.0

ENV TZ=America/Campo_Grande

WORKDIR /api

COPY package*.json prisma ./

RUN npm install

RUN npm install -g cross-env

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 5050

CMD ["npm", "start"]
