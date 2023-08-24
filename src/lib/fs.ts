import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {modelsJsonType} from '../types';

export const getModelsJson = async (migrationsPath: string) => {
  if (!existsSync(migrationsPath)) {
    mkdirSync(migrationsPath);
  }
  let modelsJson: modelsJsonType = {};
  try {
    if (existsSync(migrationsPath + '/models.json')) {
      modelsJson = JSON.parse(
        readFileSync(migrationsPath + '/models.json').toString()
      );
    }
    return modelsJson;
  } catch (e) {
    console.error('failed to get models.json file', e);
    return Promise.reject(e);
  }
};

export const setModelsJson = async (
  migrationsPath: string,
  newModelsJson: modelsJsonType
) => {
  try {
    writeFileSync(
      migrationsPath + '/models.json',
      JSON.stringify(newModelsJson)
    );
    return Promise.resolve();
  } catch (e) {
    console.error('failed to set models.json file', e);
    return Promise.reject(e);
  }
};
