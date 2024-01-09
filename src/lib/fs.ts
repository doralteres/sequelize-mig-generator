import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import consola from 'consola';
import type {modelsJsonType} from '../types.js';
import {fileURLToPath} from 'url';
import {resolve} from 'path';

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
    consola.error('failed to get models.json file', e);
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
    consola.error('failed to set models.json file', e);
    return Promise.reject(e);
  }
};

export const loadPackageJson = () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  return JSON.parse(
    readFileSync(resolve(__dirname, '../../../package.json')).toString()
  );
};
