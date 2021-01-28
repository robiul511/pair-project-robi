'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [
      {
        StoreId: 1,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        StoreId: 2,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        StoreId: 3,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        StoreId: 1,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
   return queryInterface.bulkInsert('Memberships', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Memberships', null, {})
  }
};
