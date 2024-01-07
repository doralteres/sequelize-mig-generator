import {join} from 'path';
import type {mainArgs, sequelizeRc} from '../types.js';

export const getFinalConfig = async ({
  rcPath,
  migrationsPath,
  sequelizePath,
}: mainArgs) => {
  try {
    const rc: sequelizeRc =
      !sequelizePath || !migrationsPath
        ? (await import(join(process.cwd(), rcPath))).default
        : {};

    return {
      fullSequelizePath: sequelizePath
        ? join(process.cwd(), sequelizePath)
        : rc['models-path'],
      fullMigrationsPath: migrationsPath
        ? join(process.cwd(), migrationsPath)
        : rc['migrations-path'],
    };
  } catch (e) {
    return Promise.reject(
      "Can't import .sequelizerc file - probabbly because you are using an ES Module that does not allowed to import files without an extension. Please set the paths manually!"
    );
  }
};
