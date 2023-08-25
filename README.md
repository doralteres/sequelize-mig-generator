# Sequelize Migration Generator CLI

The Sequelize Migration Generator CLI is a command-line tool designed to streamline the process of creating migration files for Sequelize-based databases. This tool helps developers manage database schema changes effectively and maintain version control for database structures.

![npm](https://img.shields.io/npm/v/sequelize-mig-generator)
![NPM](https://img.shields.io/npm/l/sequelize-mig-generator)
![GitHub issues](https://img.shields.io/github/issues/doralteres/sequelize-mig-generator)
[![CI](https://github.com/doralteres/sequelize-mig-generator/actions/workflows/release.yaml/badge.svg)](https://github.com/doralteres/sequelize-mig-generator/actions/workflows/release.yaml)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### ⚠️ Disclaimer: Development Mode ⚠️

**Please note that the Sequelize Migration Generator CLI is currently in development mode and should not be used in a production environment.**

This tool is actively being developed and may undergo significant changes, including features, code structure, and APIs. While we encourage you to explore and test it, we strongly advise against using it in a production setting at this time.

Feel free to provide feedback, report issues, or contribute to the development efforts. Your input will be valuable in shaping the tool's stability and usability as it progresses.

Thank you for your understanding and patience as we work towards making this CLI production-ready.

---

## Installation

Using npm:

```bash
npm i sequelize-mig-generator
```

Using yarn:

```bash
yarn add sequelize-mig-generator
```

Using pnpm:

```bash
pnpm i sequelize-mig-generator
```

## Getting started

- **Init sequelize-cli**

  ```bash
  npx sequelize-cli init
  ```

  This will create following folders

  - config, contains config file, which tells CLI how to connect with database
  - models, contains all models for your project
  - migrations, contains all migration files
  - seeders, contains all seed files

> read more about sequelize migrations and sequelize-cli from the [official sequelize docs](https://sequelize.org/docs/v6/other-topics/migrations/)

- **Use sequelize-mig-generator cli**

  add `make:migration` script to your `package.json`

  ```json
  {
    ...
    "scripts": {
      ...
      "make:migrations": "sequelize-mig-generator -s ./models/init.js",
      "run:migrations": "sequelize-cli db:migrate"
    }
  }
  ```

  sequelize-mig-generator only needs 2 things to know:

  - **sequelize path** - path to sequelize init script, should have a default exported function that return a promise with the updated sequelize object. (check the [example](./example/db/models/init.ts) for more info.)
  - **migrations folder** - tell the cli where to save the generated migration files.

  ```bash
  npx sequelize-mig-generator -h
  Usage: sequelize-mig-generator [options]

  Streamline the management of Sequelize database schema changes with a CLI tool for generating migration files effortlessly.

  Options:
  -V, --version                 output the version number
  -s, --sequelize-path <path>   Path for init sequelize, models and associations (default: "./models/index.js")
  -m, --migrations-path <path>  Folder to save the generated migrations (default: "./migrations")
  -h, --help                    display help for command
  ```

## Typescripts

Currently `sequelize-path` can only handle `js` file. So it recomended to compile your ts files and run the cli after.

example:

```json
{
    ...
    "scripts": {
        ...
        "compile": "tsc",
        "premake:migrations": "yarn compile",
        "make:migrations": "sequelize-mig-generator -s ./dist/db/models/init.js -m ./db/migrations",
        "run:migrations": "sequelize-cli db:migrate"
    }
}
```

## Examples

[Check out our example](./example) contains an express server with sequelize on sqlite with migrations generated by the tool.
