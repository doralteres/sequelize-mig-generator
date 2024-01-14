# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0](https://github.com/doralteres/sequelize-mig-generator/compare/v0.1.0...v0.2.0) (2024-01-14)


### Features

* :sparkles: support custom migration file extention (cjs, mjs, etc.) ([f0b48f9](https://github.com/doralteres/sequelize-mig-generator/commit/f0b48f9ae7815e9e9aca4e404e4d408a62dce149))


### Bug Fixes

* :bug: import sequelizerc on ESM issue ([2e132ae](https://github.com/doralteres/sequelize-mig-generator/commit/2e132ae7144b905d4972f949357df9712984b437))

## [0.1.0](https://github.com/doralteres/sequelize-mig-generator/compare/v0.0.9...v0.1.0) (2024-01-09)


### Features

* :zap: Move to ESM ([79cef60](https://github.com/doralteres/sequelize-mig-generator/commit/79cef605694338d86334cd6620200a828b717509))


### Bug Fixes

* :bug: Handlebar registerFunction issue ([6c778ed](https://github.com/doralteres/sequelize-mig-generator/commit/6c778ede903243bde5ab20e0aabd851220bd03bb))
* esm default import issue ([c5d5890](https://github.com/doralteres/sequelize-mig-generator/commit/c5d58901b912d5f3295ba981424c4902226b34ba))


### Performance Improvements

* :zap: better way to import json on esm ([0d1d997](https://github.com/doralteres/sequelize-mig-generator/commit/0d1d997b260617fb5ba17daf11df2cdb1483e0ae))

### [0.0.9](https://github.com/doralteres/sequelize-mig-generator/compare/v0.0.8...v0.0.9) (2023-12-10)


### Features

* **args:** read default config from .sequelizerc file ([#25](https://github.com/doralteres/sequelize-mig-generator/issues/25)) ([1fa8548](https://github.com/doralteres/sequelize-mig-generator/commit/1fa8548cfd7c26649e61708cb50a1b4d5c06f372)), closes [#15](https://github.com/doralteres/sequelize-mig-generator/issues/15)

### [0.0.8](https://github.com/doralteres/sequelize-mig-generator/compare/v0.0.7...v0.0.8) (2023-10-08)

### [0.0.7](https://github.com/doralteres/sequelize-mig-generator/compare/v0.0.6...v0.0.7) (2023-09-26)


### Bug Fixes

* :bug: sequelize complex dataTypes ([75f8e20](https://github.com/doralteres/sequelize-mig-generator/commit/75f8e2024156e3ace669f400f6d9282b1708ee6f))

### [0.0.6](https://github.com/doralteres/sequelize-mig-generator/compare/v0.0.5...v0.0.6) (2023-09-18)


### Bug Fixes

* :bug: async render issues ([94e2dd8](https://github.com/doralteres/sequelize-mig-generator/commit/94e2dd88db12a63c24f3a512d1d70cb6df67c78a))

### [0.0.5](https://github.com/doralteres/sequelize-mig-generator/compare/v0.0.4...v0.0.5) (2023-08-27)


### Bug Fixes

* :bug: get sorted modules using ModelManager ([06197ce](https://github.com/doralteres/sequelize-mig-generator/commit/06197cedd1dd0ed60a51fe09c02dfe30fe4b2b0b))
* :bug: ignore function type fields in models ([8e8b8b0](https://github.com/doralteres/sequelize-mig-generator/commit/8e8b8b06bf68cf1d90257951529c8659b094176a))
* :bug: sequelize types return undefine issue ([6267bda](https://github.com/doralteres/sequelize-mig-generator/commit/6267bda311f14c72e020ab638e6e5701f7cb254c))

### [0.0.4](https://github.com/doralteres/sequelize-mig-generator/compare/v0.0.3...v0.0.4) (2023-08-25)


### Features

* :art: improve logger & errors using consola ([4ca3498](https://github.com/doralteres/sequelize-mig-generator/commit/4ca3498458aee7bdce927290ef1eebc2cd7cf3b6))

### [0.0.3](https://github.com/doralteres/sequelize-mig-generator/compare/v0.0.2...v0.0.3) (2023-08-25)

### 0.0.2 (2023-08-24)


### Features

* :art: add templates ([5593739](https://github.com/doralteres/sequelize-mig-generator/commit/5593739be92a645adccf9fc6d99498164a6db886))
* :sparkles: add cli binary ([d8ec857](https://github.com/doralteres/sequelize-mig-generator/commit/d8ec857ed6f3813841bd7868f2839d73d12a89d7))
* add migration logics ([01fdadb](https://github.com/doralteres/sequelize-mig-generator/commit/01fdadb752d08695d9ecc331f8d951f01723c1d8))


### Bug Fixes

* cli process.exit ([e1ab128](https://github.com/doralteres/sequelize-mig-generator/commit/e1ab128e741fab18f9f03b9086b93d036cb5fcfd))
