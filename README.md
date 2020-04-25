## Ultra API

#### Project setup
1. Move to folder `.docker`
1. Copy file `.env.dist` to `.env`
1. Fill environment variables
1. Run command `docker-compose build`

#### Run application
1. Move to folder `.docker`
1. Run command `docker-compose up -d`
1. Open applications bash shell with command `docker-compose exec application /bin/bash`
1. Run development server `npm run start:dev`

#### Run tests
1. Move to folder `.docker`
1. Run command `docker-compose up -d`
1. Open applications bash shell with command `docker-compose exec application /bin/bash`
1. Run unit tests `npm run test`
1. Run e2e tests `npm run test:e2e`
