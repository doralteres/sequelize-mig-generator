import {Sequelize, DataTypes} from 'sequelize';

export const modelName = 'users';

const Users = (sequelize: Sequelize) => {
  return sequelize.define(modelName, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 20,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    secondaryEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING, // TODO: validation
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['male', 'female', 'n/a']],
      },
    },
    birthday_new: {
      type: DataTypes.DATE,
    },
    locale: {
      type: DataTypes.STRING,
    },
  });
};

export default Users;
