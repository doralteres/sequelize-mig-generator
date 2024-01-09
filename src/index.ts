import consola from 'consola';

import initDb from './lib/sequelize.js';
import {getModelsJson, setModelsJson} from './lib/fs.js';
import generateMigrations from './lib/migrations.js';
import {getFinalConfig} from './lib/config.js';

import type {mainArgs} from './types.js';

const main = async (
  {rcPath, migrationsPath, sequelizePath}: mainArgs,
  version: string
) => {
  try {
    const {fullSequelizePath, fullMigrationsPath} = await getFinalConfig({
      sequelizePath,
      migrationsPath,
      rcPath,
    });

    consola.debug({fullSequelizePath, fullMigrationsPath});

    consola.info('Using sequelize-mig-generator', version);
    consola.info('RC path:', rcPath);
    consola.info('Sequelize path:', fullSequelizePath);
    consola.info('Migrations path:', fullMigrationsPath);

    consola.start('Init Sequelize instance, models & associations');
    const sequelize = await initDb(fullSequelizePath);
    consola.success('Done');
    const modelsJson = await getModelsJson(fullMigrationsPath);
    consola.start('Checking for model changes');
    const newModelsJson = await generateMigrations(
      sequelize,
      modelsJson,
      fullMigrationsPath
    );
    consola.success('Done');
    consola.start('Update models.json if needed');
    await setModelsJson(fullMigrationsPath, newModelsJson);
    consola.success('Done');
  } catch (e) {
    return Promise.reject(e);
  }
};

export {initDb, getModelsJson, setModelsJson, generateMigrations};
export default main;
