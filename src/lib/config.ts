import {join} from 'path';
import type {mainArgs, sequelizeRc} from '../types.js';
import {readFileSync, unlinkSync, writeFileSync} from 'fs';
import consola from 'consola';

const importRc = async (rcPath: string) => {
  const cjsPath = rcPath.endsWith('js') ? rcPath : `${rcPath}.cjs`;
  try {
    consola.debug(
      `Creating a tmp sequelizerc file with extension [${cjsPath}] - should be deleted automatically after the import`
    );
    const rcContent = readFileSync(rcPath);
    writeFileSync(cjsPath, rcContent);
    const imported = await import(cjsPath);
    return imported.default;
  } catch (e) {
    consola.error(e);
    throw new Error();
  } finally {
    unlinkSync(cjsPath);
    consola.debug(`[${cjsPath}] - Deleted!`);
  }
};

export const getFinalConfig = async ({
  rcPath,
  migrationsPath,
  sequelizePath,
}: mainArgs) => {
  try {
    const rc: sequelizeRc =
      !sequelizePath || !migrationsPath
        ? await importRc(join(process.cwd(), rcPath))
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
    console.error(e);
    return Promise.reject(
      "Can't import .sequelizerc file - probabbly because you are using an ES Module that does not allowed to import files without an extension. Please set the paths manually!"
    );
  }
};
