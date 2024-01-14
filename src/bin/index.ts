#!/usr/bin/env node
import {Command} from 'commander';

import main from '../index.js';
import consola from 'consola';
import type {mainArgs} from '../types.js';
import {loadPackageJson} from '../lib/fs.js';

const {name, version, description} = loadPackageJson();

const program = new Command();

program
  .name(name)
  .description(description)
  .version(version)
  .option(
    '-r, --rc-path <path>',
    'Path for your .sequelizerc file',
    '.sequelizerc'
  )
  .option(
    '-e, --extension <extension>',
    'Extensiton for your migration files',
    '.js'
  )
  .option(
    '-s, --sequelize-path [path]',
    'Path for init sequelize, models and associations (default: [models-path] key from sequelize rc file)'
  )
  .option(
    '-m, --migrations-path [path]',
    'Folder to save the generated migrations (default: [migrations-path] key from sequelize rc file)'
  );

program.parse();

const {rcPath, sequelizePath, migrationsPath, extension}: mainArgs =
  program.opts();

if (!extension?.startsWith('.')) {
  consola.error('File extension must start with dot (.)');
  throw new Error();
}
main({rcPath, sequelizePath, migrationsPath, extension}, version)
  .then(() => {
    consola.success('Finish');
  })
  .catch(e => {
    consola.error(e);
    throw new Error(e);
  });
