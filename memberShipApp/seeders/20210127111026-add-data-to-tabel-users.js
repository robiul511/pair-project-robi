'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    let data = [
      {
        first_name: 'robi',
        last_name: 'awali',
        user_name: 'robi123',
        email: 'robi@mail.com',
        password: 'robi123',
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'mizwar',
        last_name: 'badawi',
        user_name: 'mizwar123',
        email: 'mizwar@mail.com',
        password: 'mizwar123',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
   return queryInterface.bulkInsert('Users', data, {})

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
