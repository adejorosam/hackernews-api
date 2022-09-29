# HackerNews API Assignment

This repository contains the source of my solution to the hacker news api assignment.

The project uses yarn as the default package manager. However, you can use npm if you want.

The project is built using the following technologies: NestJs + Typescript + Jest

All responses are in JSON format and cached for 60 seconds.

## Installation Procedure
Clone this repository and cd into the directory
```bash
git clone git@github.com:iamolayemi/hacker-news-api-assignment.git

cd hacker-news-api-assignment
```

## Install dependencies
```bash
yarn install 

# using npm
npm install
```

## Running the app
```bash
yarn start:dev

# using npm
npm run start:dev
```
- This will start a new server on port 3000
- To get the recent stories top words in the title of last 25 stories, visit http://localhost:3000/top-words/new-stories

## Test

```bash
# unit tests
yarn test

# test coverage
yarn test:cov

# using npm
npm run test
npm run test:cov
```

