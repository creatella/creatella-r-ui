# (PROJECT_NAME)
Base template for creating react js modules

## Installation
- update `package.json` (TODO_REPLACE)
- run `yarn` to install all dependencies

## use
run `yarn start` to start the project
if you are using node >= 17, run `yarn start:legacy` instead

## setup
- For each component create its own folder under `src/components/` with an `index.js` file for default export.(just follow the base example)
- Please use BEM naming, if any other methodology been chosen, please state it in here.

## use (PROJECT_NAME) in other project

- in the project package.json add the module as a dependency `https://github.com/creatella/(PROJECT_NAME).git#develop`
- run `yarn`, it will fetch the module and is ready to be used as any dependecny

git remote remove origin

## Components

1. Input type contains : 

- phone-input
- if you're not adding type on the components, it would be returned as default Input

2. Select Box type contains :

- single-select
- country-select
- multi-select
- if you're not adding type on the components, it would be returned as default Select Box
