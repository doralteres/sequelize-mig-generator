import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {modelsJsonType} from './types';

export const getModelsJson = async () => {
  if (!existsSync('./migrations')) {
    mkdirSync('./migrations');
  }
  let modelsJson: modelsJsonType = {};
  try {
    if (existsSync('./migrations/models.json')) {
      modelsJson = JSON.parse(
        readFileSync('./migrations/models.json').toString()
      );
    }
    return modelsJson;
  } catch (e) {
    console.error('failed to get models.json file', e);
    return Promise.reject(e);
  }
};

export const setModelsJson = async (newModelsJson: modelsJsonType) => {
  try {
    writeFileSync('./migrations/models.json', JSON.stringify(newModelsJson));
    return Promise.resolve();
  } catch (e) {
    console.error('failed to set models.json file', e);
    return Promise.reject(e);
  }
};
