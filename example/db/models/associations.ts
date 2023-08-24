import {Sequelize} from 'sequelize';

const addAssociations = (sequelize: Sequelize) => {
  const {users, tasks} = sequelize.models;
  users.hasMany(tasks);
  tasks.belongsTo(users);
};

export default addAssociations;
