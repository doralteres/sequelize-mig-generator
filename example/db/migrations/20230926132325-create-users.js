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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {max:20},
        fieldName: 'fullName',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail:true},
        fieldName: 'email',
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
