'use strict';
const encryptPassword = require('../helpers/funnctionBcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getFullName(instance) {
      if(!instance.Stores) {
        return {
          id: instance.id,
          name: `${instance.first_name} ${instance.last_name}`,
          user_name: instance.user_name,
          email: instance.email,
          role: instance.role,
        }
      } else {
        return {
          id: instance.id,
          name: `${instance.first_name} ${instance.last_name}`,
          user_name: instance.user_name,
          email: instance.email,
          role: instance.role,
          Stores: instance.Stores
        }

      }
    }
    static associate(models) {
      // define association here
      User.belongsToMany(models.Store, {through: models.Membership})
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (instance) => {
        instance.password = encryptPassword(instance.password)
        console.log(instance)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};