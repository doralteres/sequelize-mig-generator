import {existsSync} from 'fs';
import {Sequelize} from 'sequelize';

async function initDb(sequelizePath: string): Promise<Sequelize> {
  if (!existsSync(sequelizePath)) {
    console.error(sequelizePath, 'does not exist');
    return Promise.reject('sequelize path not exist');
  }
  const {default: init} = require(sequelizePath.slice(0, -3)); // Remove the extention {.js | ,ts}
  if (!init) {
    console.error(sequelizePath, 'does not have a default export');
    return Promise.reject(sequelizePath + ' does not have a default export');
  }
  try {
    const res: Sequelize = await init();
    return res;
  } catch (e) {
    return Promise.reject(e);
  }
}

export default initDb;
