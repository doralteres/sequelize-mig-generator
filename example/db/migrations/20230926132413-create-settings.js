'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        fieldName: 'id',
      },
      key: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        fieldName: 'key',
      },
      value: {
        type: Sequelize.STRING,
        fieldName: 'value',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        fieldName: 'isActive',
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
    await queryInterface.dropTable('settings');
  },
};
