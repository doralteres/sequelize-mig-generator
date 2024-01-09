import {Sequelize, DataTypes} from 'sequelize';

export const modelName = 'activities';

const activities = (sequelize: Sequelize) => {
  return sequelize.define(modelName, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {model: 'users', key: 'id'},
    },
    comment: {
      type: DataTypes.STRING,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
    },
  });
};

export default activities;
