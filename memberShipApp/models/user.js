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
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please insert your first name'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please insert your last name'
        }
      }
    },
    user_name:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please insert your user name'
        }
      }
    },
    email:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please insert your email'
        }
      }
    },
    password:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please insert your password'
        }
      }
    },
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