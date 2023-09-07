# express-sequelize-example

Example of an express web server, sequelize modules & associations declarations with migrations generated bt `sequelize-mig-generator`

## Getting started

- Install dependencies

  ```sh
  yarn
  ```

- Run the app in dev mode
  ```sh
  yarn dev
  ```
- Run the app in production mode
  ```sh
  yarn build
  yarn start
  ```

## Migrations
- Check out `db` folder contains all the models, cinfig, seed & migrations
- After changing something in the models you can use `sequelize-mig-generator` to generate new migration file/s
    ```sh
    yarn make:migrations
    ```
- Run the migration infront of the database using `sequelize-cli`
    ```sh
    yarn run:migrations
    ```