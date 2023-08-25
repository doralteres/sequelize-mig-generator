'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        fieldName: 'id',
      },
      fullName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {max:20},
        fieldName: 'fullName',
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        validate: {isEmail:true},
        fieldName: 'email',
      },
      secondaryEmail: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true,
        validate: {isEmail:true},
        fieldName: 'secondaryEmail',
      },
      phoneNumber: {
        type: Sequelize.STRING(255),
        fieldName: 'phoneNumber',
      },
      gender: {
        type: Sequelize.STRING(255),
        validate: {isIn:[['male','female','n/a']]},
        fieldName: 'gender',
      },
      birthday_new: {
        type: Sequelize.DATE,
        fieldName: 'birthday_new',
      },
      locale: {
        type: Sequelize.STRING(255),
        fieldName: 'locale',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        fieldName: 'createdAt',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        fieldName: 'updatedAt',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
