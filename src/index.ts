import 'dotenv/config';
import initDb from './lib/sequelize';
import {getModelsJson, setModelsJson} from './lib/fs';
import generateMigrations from './lib/migrations';

const main = async () => {
  const sequelize = await initDb();
  const modelsJson = await getModelsJson();
  const newModelsJson = await generateMigrations(sequelize, modelsJson);
  await setModelsJson(newModelsJson);
};

main()
  .then(() => {
    console.log('done!');
  })
  .catch(e => {
    throw new Error(e);
  });
