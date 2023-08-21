import {existsSync} from 'fs';
import {join} from 'path';
import {Sequelize} from 'sequelize';

async function connect(sequelize: Sequelize): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('DB Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw new Error();
  }
}

async function initModels(
  sequelize: Sequelize,
  initModelsPath: string
): Promise<Sequelize> {
  const path = join(__dirname, initModelsPath);

  if (!existsSync(path)) {
    console.error(path, 'does not exist');
    return Promise.reject('initModelsPath not exist');
  }
  const {default: init} = require(path.slice(0, -3)); // Remove the extention {.js | ,ts}
  if (!init) {
    console.error(path, 'does not have a default export');
    return Promise.reject(path + ' does not have a default export');
  }
  const res: Sequelize = await init(sequelize);
  return res;
}

async function initDb(): Promise<Sequelize> {
  const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS} = process.env;
  if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASS) {
    return Promise.reject();
  }
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    define: {
      freezeTableName: true,
    },
    // host: DB_HOST,
    // storage: DB_HOST,
    // port: parseInt(DB_PORT),
    dialect: 'sqlite',
    storage: './test.db',
  });

  await connect(sequelize);

  // Define models
  const sequelizeWithModels = await initModels(sequelize, './models/index.ts');

  return sequelizeWithModels;
}

export default initDb;
