import {existsSync, readdirSync} from 'fs';
import {basename, join} from 'path';
import {Sequelize} from 'sequelize';

const associationsFile = 'associations';

const importDefaultFunction = (path: string) => {
  const imported = require(path);
  let init = imported;
  if (typeof imported !== 'function') {
    init = imported.default;
  }
  if (!init) {
    console.error(imported, 'does not have a default export');
    return Promise.reject(imported + ' does not have a default export');
  }
  return init;
};

const initModels = async (sequelize: Sequelize) => {
  for (const model of readdirSync(__dirname)) {
    const modelNoExtention = model.slice(0, -3);
    if (
      model !== basename(__filename) &&
      modelNoExtention !== associationsFile
    ) {
      const init = await importDefaultFunction(
        join(__dirname, modelNoExtention)
      );
      console.log('Init model', modelNoExtention);
      await init(sequelize);
    }
  }
  if (
    existsSync(join(__dirname, associationsFile + '.js')) ||
    existsSync(join(__dirname, associationsFile + '.ts'))
  ) {
    const {default: init} = require(join(__dirname, associationsFile));
    if (!init) {
      console.error(associationsFile, 'does not have a default export');
      return Promise.reject(
        associationsFile + ' does not have a default export'
      );
    }
    console.log('Applying associations');
    await init(sequelize);
  } else {
    console.warn('No associations - skipping...');
  }
  return sequelize;
};

export default initModels;
