#!/usr/bin/env node
import {Command} from 'commander';

import main from '../index.js';
import consola from 'consola';
import type {mainArgs} from '../types.js';

const {
  default: {name, version, description},
} = await import('../../package.json', {
  assert: {type: 'json'},
});
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
    '-s, --sequelize-path [path]',
    'Path for init sequelize, models and associations (default: [models-path] key from sequelize rc file)'
  )
  .option(
    '-m, --migrations-path [path]',
    'Folder to save the generated migrations (default: [migrations-path] key from sequelize rc file)'
  );

program.parse();

const {rcPath, sequelizePath, migrationsPath}: mainArgs = program.opts();

main({rcPath, sequelizePath, migrationsPath}, version)
  .then(() => {
    consola.success('Done');
  })
  .catch(e => {
    consola.error(e);
    throw new Error(e);
  });
