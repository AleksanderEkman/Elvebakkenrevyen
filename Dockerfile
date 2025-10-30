FROM node:23-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
# Debug prisma directory
RUN ls -la && ls -la prisma || echo "Prisma directory not found"
# Check if prisma was generated correctly
RUN ls -la node_modules/.prisma || echo "Prisma client not generated"
RUN npm run build
RUN npm prune --production

FROM node:23-alpine
WORKDIR /app
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/
COPY --from=build /app/package.json .
COPY --from=build /app/prisma prisma/
COPY --from=build /app/.env ./.env
EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "build/index.js"]
