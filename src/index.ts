import initDb from './lib/sequelize';
import {getModelsJson, setModelsJson} from './lib/fs';
import generateMigrations from './lib/migrations';
import {mainArgs} from './types';
import {join} from 'path';

const main = async ({migrationsPath, sequelizePath}: mainArgs) => {
  try {
    const fullSequelizePath = join(process.cwd(), sequelizePath);
    const fullMigrationsPath = join(process.cwd(), migrationsPath);

    console.log({fullSequelizePath, fullMigrationsPath});

    const sequelize = await initDb(fullSequelizePath);
    const modelsJson = await getModelsJson(fullMigrationsPath);
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
