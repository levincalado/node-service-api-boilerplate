# Node Service/API Boilerplate

`Node.js` boilerplate for building `Services/API` focused on separation of concerns and scalability.

It is heavily inspired by [node-api-boilerplate](https://github.com/talyssonoc/node-api-boilerplate) of [Talysson De Oliveira](https://github.com/talyssonoc).

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Directories](#directories)
- [Configuration](#configuration)
    - [Application](#application-configuration)
    - [Logging](#logging-configuration)
    - [Database](#database-configuration)
        - [Multi-tenant Database Setup](#multi-tenant-database-setup)
    - [Runtime Setup](#runtime-setup)
        - [Server-based Runtime](#server-based-runtime)
        - [Serverless Runtime](#serverless-runtime)
- [Source Code](#source-code)
    - [Application Layer (`app`)](#application-layer)
    - [Domain Layer (`domain`)](#domain-layer)
    - [Infrastructure Layer (`infra`)](#infrastructure-layer)
    - [Interfaces Layer (`interfaces`)](#interfaces-layer)
- [Documentation](#documentation)
    - [API Specifications](#api-specifications)
- [Deployment](#deployment)
    - [Server Hosted](#server-hosted-deployment)
    - [Serverless](#serverless-deployment)
    - [Container](#containerizing-application)
        - [Building a Docker Image](#building-a-docker-image)
        - [Running the Docker Image](#running-the-docker-image)
- [Credits](#credits)

## Features 

- `Multilayer folder structure` - following [Domain Driven Design](https://dddcommunity.org/) and [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- `Production Ready` - setup with [PM2](https://pm2.keymetrics.io/)
- `Scalable Web Server` - uses [Express.js](http://expressjs.com/)
- `Dependency Injection` - using [awilix](https://www.npmjs.com/package/awilix)
- `Serverless Ready` - via [serverless](https://www.serverless.com/) framework
- `Containerized Application Ready` - via [docker](https://www.docker.com/)
- `OpenAPI 3.0 Documentation` - using [swagger](https://swagger.io/)
- `Database Integration` - ORM support using [sequelize](https://sequelize.org/)
- `Multi-tenant Database Setup`
- `Structured Logging` - using [winston](github.com/winstonjs/winston)
- `Code Linting` - using [eslint](https://eslint.org/) following [airbnb-style-guide](https://github.com/airbnb/javascript)
- `BDD/TDD Ready` - test suite using [mocha](https://mochajs.org/) and [chai](https://www.chaijs.com/)

## Requirements

- [Node.js](https://nodejs.org/en/) `v.10+` - Javascript Runtime
- [npm](https://www.npmjs.com/) - Node Package Manager
- [sequelize-cli](https://sequelize.org/) - for Database ORM Tool
- [serverless](https://www.serverless.com/) - for Serverless Framework
- [docker](https://www.docker.com/) - for Containerizing Application

## Getting Started

1. Clone the repository.

```sh
$ git clone git@github.com:agaphetos/node-service-api-boilerplate.git
```

2. Install package dependencies.

```sh
$ npm install
```

3. Run the application. Application is running on http://localhost:3000/. You can also see the sample `API documentation` on http://localhost:3000/api/v1/docs

```sh
$ npm start
```

## Directories

Directory structure of the project

- [config](#configuration) - Configuration Setup for the API
- [src](#source-code) - Source Code inspired by DDD and Clean Architecture

## Configuration

Configurations for are ready for the following with the use of `ENVIRONMENT VARIABLES`:

- [application](#application-configuration)
- [logging](#logging-configuration)
- [database](#database-configuration)

### Application Configuration

This contains `Application` specific configuration like `API Integration`, `Service Configuration` and all related for the application you are building.

### Logging Configuration

We are using [winston](https://www.npmjs.com/package/winston) as our logging library.

By default, our `application` uses `structured logging` pattern using `json` format.

To customize the `logging` configuration. There is an example config file [logging.js.example](config/logging.js.example).

For more detailed usage about `winston`. See official documentation on https://github.com/winstonjs/winston.

### Database Configuration

We are using [sequelize](https://sequelize.org/) v5 as our `ORM`.

By default, our `application` loads our `staged environment` from `config/database.js` file.

To define the `database connection and options`. There is an example config file [database.js.example](config/database.js.example).

For more detailed usage about `sequelize`. See official documentation on https://sequelize.org/master/.

#### Multi-tenant Database Setup

A `multi-tenant` database allows us to support multiple database for our `infra/database` codebase.

This setup is inspired by the article [Using multiple databases with NodeJS and Sequelize](https://medium.com/unetiq/using-multiple-databases-with-nodejs-and-sequelize-59e0abcbbe6f) from [Medium](https://medium.com/).

The steps below will help you setup a specific `database source`.

1. Setup a datasource registration on `config/database.js` by adding a property `(key: value)` on the exportable object. See `example` on [config/database.js.example](config/database.js.example) and `specification` below:

```javascript
<datasource-identifier>: {
  host: process.env.SPECIFIC_DB_HOST,
  username: process.env.SPECIFIC_DB_USERNAME,
  password: process.env.SPECIFIC_DB_PASSWORD,
  database: process.env.SPECIFIC_DB_DATABASE,
  dialect: process.env.SPECIFIC_DB_DIALECT,
  ...options,
},
```

2. Add the desired `ENVIRONMENT VARIABLES` on `.env` or `env.yml`. See `specification` below:

`.env`: See `example` on [.env.example](.env.example) 

```.env
SPECIFIC_DB_HOST=<value-here>
SPECIFIC_DB_USERNAME=<value-here>
SPECIFIC_DB_PASSWORD=<value-here>
SPECIFIC_DB_DATABASE=<value-here>
SPECIFIC_DB_DIALECT=<value-here>
```

`env.yml`: See `example` on [env.yml.example](env.yml.example) 

```yaml
<stage-name>:
  SPECIFIC_DB_HOST: <value-here>
  SPECIFIC_DB_USERNAME: <value-here>
  SPECIFIC_DB_PASSWORD: <value-here>
  SPECIFIC_DB_DATABASE: <value-here>
  SPECIFIC_DB_DIALECT: <value-here>
```

_*`Note:` The steps above (1 and 2) will enable the application to load `database models` to our `application instance`.*_

3. Create a `.sequelizerc` for the specific datasource. See `example` on [.sequelize.example](.sequelize.example)

4. Add an `npm-script` entry for the datasource instance. See specification below:

```json
{
  "scripts": {
    ...,
    "sequelize:<datasource-identifier>:migrate": "sequelize --options-path ./.sequelize-<datasource-identifier> --env <datasource-identifier> db:migrate",
    "sequelize:<datasource-identifier>:migrate:undo": "sequelize --options-path ./.sequelize-<datasource-identifier> --env <datasource-identifier> db:migrate:undo",
    "sequelize:<datasource-identifier>:seed:all": "sequelize --options-path ./.sequelize-<datasource-identifier> --env <datasource-identifier> db:seed:all"
    ...
  }
}
```

_*`NOTE:` The steps above (3 and 4) will enable the us to execute `sequelize` commands like `migrate` and `seed` using the `npm-script` defined.*_

### Runtime Setup

Defined `ENVIRONMENT VARIABLES` are loaded by automatically upon runtime.

There are 2 runtimes supported by our application.

#### Server-based Runtime 

The `ENVIRONMENT VARIABLES` are loaded using [dotenv](https://www.npmjs.com/package/dotenv). Setup with the use of `.env` file. See sample [.env.example](.env.example)

#### Serverless Runtime

The `ENVIRONMENT VARIABLES` are loaded by `serverless` upon package `deployment` and `offline` execution. Setup with the use of `env.yml` file. See sample [env.yml.examp

## Source Code

The `src/` directory contains the API source code. 

It uses a folder structure and logical architecture focused on `separation of concerns` based in `Domain-driven design` and `Clean architecture`.

Instead of the classical `controllers/models/services` folders, we now have layers inside the `src/` folder. Each of the folder layers is scoped by a namespace regarding the concern it is about.

### Application layer

The application layer is responsible to mediate between your input interfaces and your business domain. In this layer we'll have the use cases of your application and your application services.

### Domain layer

Here you'll define your business domain classes, functions and services that compose your domain model. All your business rules should be declared in this layer so the application layer can use it to compose your use cases.

### Infrastructure layer

This is the lowest of the layers. In the infra layer you'll have the communication with what is outside your application, like the database, external services and direct communication with frameworks.

### Interfaces layer

This folder contains all the entry points for your application. From the beginning here's where your Express controllers will be (inside the interfaces/http folder).

## Documentation

Documentations about the API:
- [API Specifications](#api-specifications)

### API Specifications

Shows the API Specs following `OAS3` standard and was written following a `swagger.yaml template` using `swagger`.

The sample `API Specification` can be seen on http://localhost:3000/api/v1/docs/.

For more detailed usage about `swagger`. See official documentation on https://swagger.io/docs/specification/about/.

## Deployment

Currently our application supports the following deployments:

- [Server Hosted](#server-hosted-deployment)
- [Serverless](#serverless-deployment)
- [Container](#containerizing-application)

### Server Hosted Deployment

```sh
$ npm start
```

### Serverless Deployment

```sh
$ sls deploy -s [your-stage]
```

### Containerizing Application

The contains separate `Dockerfile` for `development` and `production` stage releases.

- [development](development.Dockerfile)
- [production](production.Dockerfile)

#### Building a Docker Image

To build a docker image. Use `docker build` command.

```sh
$ docker build -t <workspace/image-name:version> -f <stage>.Dockerfile
```

#### Running the Docker Image

To run a docker image. Use `docker run` command.

Use the following options for running our image:

- `-p` - specify port mappings
- `-d` - docker image to run
- `-e, --env, --env-file` - specify an environment variable or environment file

```sh
$ docker run -p <machine-port>:<container-port> -d <workspace/image-name>
```

# Credits

- [Talysson De Oliveira](https://github.com/talyssonoc) - `node-api-boilerplate `
- [Lucas Spreiter](https://medium.com/@lucas.spreiter) - `multi-tenant database setup`
