import {Sequelize} from 'sequelize';

const addAssociations = (sequelize: Sequelize) => {
  const {users, tasks, activities} = sequelize.models;
  users.hasMany(tasks);
  tasks.belongsTo(users);

  users.hasMany(activities);
  activities.belongsTo(users);
  return sequelize;
};

export default addAssociations;
