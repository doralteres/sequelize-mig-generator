import consola from 'consola';

import initDb from './lib/sequelize';
import {getModelsJson, setModelsJson} from './lib/fs';
import generateMigrations from './lib/migrations';
import {getFinalConfig} from './lib/config';

import {version} from '../package.json';
import {mainArgs} from './types';

const main = async ({rcPath, migrationsPath, sequelizePath}: mainArgs) => {
  try {
    const {fullSequelizePath, fullMigrationsPath} = getFinalConfig({
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
    await setModelsJson(fullMigrationsPath, newModelsJson);
  } catch (e) {
    return Promise.reject(e);
  }
};

export {initDb, getModelsJson, setModelsJson, generateMigrations};
export default main;
