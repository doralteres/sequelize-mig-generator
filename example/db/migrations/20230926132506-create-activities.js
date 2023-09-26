'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activities', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        fieldName: 'id',
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {model:'users',key:'id'},
        fieldName: 'userId',
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      comment: {
        type: Sequelize.STRING,
        fieldName: 'comment',
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
    await queryInterface.dropTable('activities');
  },
};
