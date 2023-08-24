#!/usr/bin/env node
import {Command} from 'commander';

import {name, version, description} from '../../package.json';
import {mainArgs} from '../types';
import main from '..';

const program = new Command();

program
  .name(name)
  .description(description)
  .version(version)
  .option(
    '-s, --sequelize-path <path>',
    'Path for init sequelize, models and associations',
    './models/index.js'
  )
  .option(
    '-m, --migrations-path <path>',
    'Folder to save the generated migrations',
    './migrations'
  );

program.parse();

const {sequelizePath, migrationsPath}: mainArgs = program.opts();

main({migrationsPath, sequelizePath})
  .then(() => {
    console.log('done');
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
