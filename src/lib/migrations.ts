import type {
  Model,
  ModelAttributeColumnOptions,
  NumberDataTypeOptions,
  Sequelize,
  TextDataTypeOptions,
} from 'sequelize';
import type {modelsJsonType} from '../types.js';
import renderTemplate from './templates.js';
import consola from 'consola';

const getSortedModels = async (sequelize: Sequelize) => {
  return (sequelize.modelManager.getModelsTopoSortedByForeignKey() || [])
    .map(m => m.name)
    .reverse();
};

const addTypesToModel = async (modelAttr: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [x: string]: ModelAttributeColumnOptions<Model<any, any>>;
}) => {
  const attrWithTypes = modelAttr;
  for (const attr in modelAttr) {
    const attrType = modelAttr[attr].type;
    const attrOpt: TextDataTypeOptions | NumberDataTypeOptions | undefined =
      // @ts-expect-error we know option is there
      attrType?.options;
    attrWithTypes[attr].type =
      typeof attrType === 'string'
        ? attrType
        : `${attrType.key}${
            attrOpt
              ? attrOpt.length
                ? `(${attrOpt.length})`
                : 'precision' in attrOpt && 'scale' in attrOpt
                ? `(${attrOpt.precision}, ${attrOpt.scale})`
                : ''
              : ''
          }`;
  }
  return attrWithTypes;
};

const generateMigrations = async (
  sequelize: Sequelize,
  modelsJson: modelsJsonType,
  migrationsPath: string,
  extension?: string
) => {
  const newModelsJson: modelsJsonType = {};
  const sortedModels = await getSortedModels(sequelize);
  // Checking left-to-right diff
  for (const model of sortedModels) {
    const modelObj = sequelize.models[model];
    const modelAttr = await addTypesToModel(modelObj.getAttributes());
    newModelsJson[model] = modelAttr;
    if (Object.keys(modelsJson).indexOf(model) === -1) {
      consola.start(model, 'does not exist, creating table');
      await renderTemplate(
        'createTable',
        {tableName: model, attributes: modelAttr},
        migrationsPath,
        extension
      );
    } else {
      for (const attr in modelAttr) {
        if (Object.keys(modelsJson[model]).indexOf(attr) === -1) {
          consola.start(model, attr, 'does not exist, adding column');
          await renderTemplate(
            'addColumn',
            {tableName: model, columnName: attr, attributes: modelAttr[attr]},
            migrationsPath,
            extension
          );
        } else {
          if (
            JSON.stringify({data: modelsJson[model][attr]}) !==
            JSON.stringify({data: modelAttr[attr]})
          ) {
            consola.start(model, attr, 'is changed, modifying options');
            await renderTemplate(
              'modifyColumn',
              {
                tableName: model,
                columnName: attr,
                attributes: modelAttr[attr],
                prevAttributes: modelsJson[model][attr],
              },
              migrationsPath,
              extension
            );
          }
        }
      }
    }
  }
  // Checking right-to-left diff
  for (const model in modelsJson) {
    if (Object.keys(sequelize.models).indexOf(model) === -1) {
      consola.start(model, 'shouldnt exist, deleting table');
      await renderTemplate(
        'removeTable',
        {tableName: model},
        migrationsPath,
        extension
      );
    } else {
      const modelObj = sequelize.models[model];
      const modelAttr = modelObj.getAttributes();

      for (const attr in modelsJson[model]) {
        if (Object.keys(modelAttr).indexOf(attr) === -1) {
          consola.start(model, attr, 'shouldnt exist, deleting column');
          await renderTemplate(
            'removeColumn',
            {tableName: model, columnName: attr},
            migrationsPath,
            extension
          );
        }
      }
    }
  }
  return newModelsJson;
};

export default generateMigrations;
