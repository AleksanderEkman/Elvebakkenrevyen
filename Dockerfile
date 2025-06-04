FROM node:23-alpine AS build
WORKDIR /app
COPY package*.json ./
# Installer dependencies
RUN npm ci
COPY . .
# Generer prisma client
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

FROM node:23-alpine
WORKDIR /app
# Kopier dependencies og ferdigbygget kode
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/
COPY --from=build /app/package.json .
COPY --from=build /app/prisma prisma/
COPY --from=build /app/.env ./.env
EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "build/index.js"]
