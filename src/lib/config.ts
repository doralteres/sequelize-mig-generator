import {join} from 'path';
import {mainArgs, sequelizeRc} from '../types';

export const getFinalConfig = ({
  rcPath,
  migrationsPath,
  sequelizePath,
}: mainArgs) => {
  const rc: sequelizeRc =
    !sequelizePath || !migrationsPath
      ? require(join(process.cwd(), rcPath))
      : {};
  return {
    fullSequelizePath: sequelizePath
      ? join(process.cwd(), sequelizePath)
      : rc['models-path'],
    fullMigrationsPath: migrationsPath
      ? join(process.cwd(), migrationsPath)
      : rc['migrations-path'],
  };
};
