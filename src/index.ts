import 'dotenv/config';
import initDb from './sequelize';
import {getModelsJson, setModelsJson} from './fs';
import generateMigrations from './migrations';

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
