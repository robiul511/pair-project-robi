'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    let data = [
      {
        name: 'addidas store',
        type: 'sports',
        information: 'toko ini menjual sepatu adidas yang keren',
        location: 'jakarta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'allisan store',
        type: 'fashion',
        information: 'toko ini menjual baju all gender',
        location: 'bandung',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'asus store',
        type: 'electronic',
        information: 'toko ini menjual segala perangkat electronic asus',
        location: 'surabaya',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
   return queryInterface.bulkInsert('Stores', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stores', null, {})
  }
};
