import {Model, ModelAttributeColumnOptions} from 'sequelize';

export type modelsJsonType = {
  [model: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [attr: string]: ModelAttributeColumnOptions<Model<any, any>>;
  };
};

export type templates =
  | 'createTable'
  | 'removeTable'
  | 'addColumn'
  | 'removeColumn'
  | 'modifyColumn';

type templateAttributes =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ModelAttributeColumnOptions<Model<any, any>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | {readonly [x: string]: ModelAttributeColumnOptions<Model<any, any>>};

export interface templateData {
  tableName: string;
  columnName?: string;
  attributes?: templateAttributes;
  prevAttributes?: templateAttributes;
}
