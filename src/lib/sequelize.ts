import consola from 'consola';
import {existsSync} from 'fs';
import {join} from 'path';
import {Sequelize} from 'sequelize';

async function initDb(sequelizePath: string): Promise<Sequelize> {
  if (!existsSync(sequelizePath)) {
    consola.error(sequelizePath, 'does not exist');
    return Promise.reject('sequelize path not exist');
  }
  const finalPathToImport = sequelizePath.endsWith('.js') // Remove the extention (.js)
    ? sequelizePath
    : join(sequelizePath, 'index.js');

  const {
    default: {default: init},
  } = await import(finalPathToImport);
  if (!init) {
    consola.error(sequelizePath, 'does not have a default export');
    return Promise.reject(sequelizePath + ' does not have a default export');
  }
  try {
    console.group('Sequelize init');
    const res: Sequelize = await init();
    console.groupEnd();
    return res;
  } catch (e) {
    return Promise.reject(e);
  }
}

export default initDb;
