FROM node:22-alpine AS development

WORKDIR /usr/src/app

RUN npm install -g pnpm@12.4.1

# Copy package management configurations
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# FIX: Copy the global NestJS CLI and Webpack build configurations
COPY tsconfig.json nest-cli.json webpack.config.js ./

# Copy all application and library source trees
COPY apps apps
COPY libs libs

# Install dependencies and link the pnpm monorepo workspace
RUN pnpm install

# Build the application
RUN pnpm run build reservations

FROM node:22-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN npm install -g pnpm@12.4.1
RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]
