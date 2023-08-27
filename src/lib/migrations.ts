import {Model, ModelAttributeColumnOptions, Sequelize} from 'sequelize';
import {modelsJsonType} from '../types';
import {find, flattenDepth, partition} from 'lodash';
import renderTemplate from './templates';
import consola from 'consola';

const getSortedModels = async (sequelize: Sequelize) => {
  const sortedModels = partition(sequelize.models, o =>
    find(
      o.associations,
      f => f.associationType === 'HasOne' || f.associationType === 'HasMany'
    )
  );
  return flattenDepth(sortedModels, 1).map(s => s.name);
};

const addTypesToModel = async (modelAttr: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [x: string]: ModelAttributeColumnOptions<Model<any, any>>;
}) => {
  const attrWithTypes = modelAttr;
  for (const attr in modelAttr) {
    const attrType = modelAttr[attr].type;
    attrWithTypes[attr].type =
      typeof attrType === 'string'
        ? attrType
        : `${attrType.key}${
            // @ts-expect-error we know lenght is exist
            attrType._length ? `(${attrType._length})` : ''
          }`;
  }
  return attrWithTypes;
};

const generateMigrations = async (
  sequelize: Sequelize,
  modelsJson: modelsJsonType,
  migrationsPath: string
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
        migrationsPath
      );
    } else {
      for (const attr in modelAttr) {
        if (Object.keys(modelsJson[model]).indexOf(attr) === -1) {
          consola.start(model, attr, 'does not exist, adding column');
          await renderTemplate(
            'addColumn',
            {tableName: model, columnName: attr, attributes: modelAttr[attr]},
            migrationsPath
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
              migrationsPath
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
      await renderTemplate('removeTable', {tableName: model}, migrationsPath);
    } else {
      const modelObj = sequelize.models[model];
      const modelAttr = modelObj.getAttributes();

      for (const attr in modelsJson[model]) {
        if (Object.keys(modelAttr).indexOf(attr) === -1) {
          consola.start(model, attr, 'shouldnt exist, deleting column');
          await renderTemplate(
            'removeColumn',
            {tableName: model, columnName: attr},
            migrationsPath
          );
        }
      }
    }
  }
  return newModelsJson;
};

export default generateMigrations;
