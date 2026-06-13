FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com && \
    npm install --prefer-offline --no-audit

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com && \
    npm install --omit=dev --prefer-offline --no-audit

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/main.js"]
