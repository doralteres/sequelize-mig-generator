import {Model, ModelAttributeColumnOptions, Sequelize} from 'sequelize';
import {modelsJsonType} from './types';
import {find, flattenDepth, partition} from 'lodash';
import renderTemplate from './templates';

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
    // @ts-expect-error we know key is exist
    attrWithTypes[attr].type = `${attrType.key}${
      // @ts-expect-error we know lenght is exist
      attrType._length ? `(${attrType._length})` : ''
    }`;
  }
  return attrWithTypes;
};

const generateMigrations = async (
  sequelize: Sequelize,
  modelsJson: modelsJsonType
) => {
  const newModelsJson: modelsJsonType = {};
  const sortedModels = await getSortedModels(sequelize);
  console.debug('sortedModels', sortedModels);
  // Checking left-to-right diff
  for (const model of sortedModels) {
    const modelObj = sequelize.models[model];
    const modelAttr = await addTypesToModel(modelObj.getAttributes());
    newModelsJson[model] = modelAttr;
    if (Object.keys(modelsJson).indexOf(model) === -1) {
      console.warn(model, 'does not exist, creating table');
      await renderTemplate(
        'createTable',
        {tableName: model, attributes: modelAttr},
        './migrations'
      );
    } else {
      for (const attr in modelAttr) {
        if (Object.keys(modelsJson[model]).indexOf(attr) === -1) {
          console.warn(model, attr, 'does not exist, adding column');
          await renderTemplate(
            'addColumn',
            {tableName: model, columnName: attr, attributes: modelAttr[attr]},
            './migrations'
          );
        } else {
          if (
            JSON.stringify({data: modelsJson[model][attr]}) !==
            JSON.stringify({data: modelAttr[attr]})
          ) {
            console.warn(model, attr, 'is changed, modifying options');
            await renderTemplate(
              'modifyColumn',
              {
                tableName: model,
                columnName: attr,
                attributes: modelAttr[attr],
                prevAttributes: modelsJson[model][attr],
              },
              './migrations'
            );
          }
        }
      }
    }
  }
  // Checking right-to-left diff
  for (const model in modelsJson) {
    if (Object.keys(sequelize.models).indexOf(model) === -1) {
      console.warn(model, 'shouldnt exist, deleting table');
      await renderTemplate('removeTable', {tableName: model}, './migrations');
    } else {
      const modelObj = sequelize.models[model];
      const modelAttr = modelObj.getAttributes();

      for (const attr in modelsJson[model]) {
        if (Object.keys(modelAttr).indexOf(attr) === -1) {
          console.warn(model, attr, 'shouldnt exist, deleting column');
          await renderTemplate(
            'removeColumn',
            {tableName: model, columnName: attr},
            './migrations'
          );
        }
      }
    }
  }
  return newModelsJson;
};

export default generateMigrations;
