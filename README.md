# Card Game

[![Build Status](https://circleci.com/gh/raparicio6/card-game-node.svg?style=shield)](https://circleci.com/gh/raparicio6/card-game-node-node)
[![Coverage Status](https://coveralls.io/repos/github/raparicio6/card-game-node/badge.svg?branch=master)](https://coveralls.io/github/raparicio6/card-game-node?branch=master)

## Next Steps
* Document API
* Mock random generator function in utils in order to test CardFactory each case manually
* Limit requests from the same IP in order to prevent an atacker from creating too many games and populate the database

## Getting Started

### Installing

Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm).  
Nvm approach is preferred.

Install dependencies by running `npm i`.

Install [Redis](https://redis.io/download). Its very easy!

Create a *.env* file at the root of the project and add:  
`REDIS_NAME_TEST=0`  
`REDIS_NAME_DEV=1`

This project has its corresponding [GraphQL](https://github.com/raparicio6/card-game-graphql)  and [Frontend](https://github.com/raparicio6/card-game-react).

### Starting app

We have two ways to start the app. To start it in production mode run `npm start` in the root path of the project. To start it in development mode (nodemon) run `npm run start-dev`. Then access the app at **localhost:port**. The port is logged in the console where you run the start script.

## Development

### Environments

By default, the environment will be **development**, but you can easily change it using the **NODE_ENV** environmental variable.

### Environment variables

[Dotenv](https://www.npmjs.com/package/dotenv) is used for managing environment variables. They are stored in the `/.env` file. Take into account that the variables defined in the `bashrc` are not overrided.

The environment variables should be added to the `.env` file in the form of `NAME=VALUE`, as the following example:

```
PORT=8081
CLIENTS_API=http://api.clients.example.org/
```

**Remember not to push nor commit the `.env` file.**

### Testing

In order to execute the tests run `npm test`.  
[Jest](https://jestjs.io/) was used as the testing framework.

## Built With

* [Express.js](https://expressjs.com/)
* [Redis](https://redis.io/)
* [CircleCI](https://circleci.com/)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Run the tests (`npm test`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request

## About

This project was written and is maintained by [Rodrigo Aparicio](https://github.com/raparicio6).

## License

This project is licensed under the MIT License.
