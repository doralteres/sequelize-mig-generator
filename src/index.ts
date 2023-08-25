import {join} from 'path';
import consola from 'consola';

import initDb from './lib/sequelize';
import {getModelsJson, setModelsJson} from './lib/fs';
import generateMigrations from './lib/migrations';
import {mainArgs} from './types';

import {version} from '../package.json';

const main = async ({migrationsPath, sequelizePath}: mainArgs) => {
  try {
    const fullSequelizePath = join(process.cwd(), sequelizePath);
    const fullMigrationsPath = join(process.cwd(), migrationsPath);

    consola.info('Using sequelize-mig-generator', version);
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
