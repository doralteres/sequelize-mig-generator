#!/usr/bin/env node
import {Command} from 'commander';

import {name, version, description} from '../../package.json';
import {mainArgs} from '../types';
import main from '..';
import consola from 'consola';

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

main({rcPath, sequelizePath, migrationsPath})
  .then(() => {
    consola.success('Done');
  })
  .catch(e => {
    consola.error(new Error('sequelize-mig-generator error'));
    throw new Error(e);
  });
