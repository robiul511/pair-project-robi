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
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    information: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};