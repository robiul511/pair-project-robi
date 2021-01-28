'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static addWords(instance) {
      if(!instance.Users) {
        return {
          id: instance.id,
          name: `${instance.name} store`,
          type: instance.type,
          information: instance.information,
          location: `${instance.location} city`,
        }
      } else {
        return {
          id: instance.id,
          name: `${instance.name} store`,
          type: instance.type,
          information: instance.information,
          location: `${instance.location} city`,
          Users: instance.Users
        }
      }
    }
    static associate(models) {
      // define association here
      Store.belongsToMany(models.User, {through: models.Membership})
    }
  };
  Store.init({
    name:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'name cannot be empty'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'type cannot be empty'
        }
      }
    },
    information: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'information cannot be empty'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'location cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};