'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataOrderProducts = require("../orderproducts.json").map(element => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
      return element;
    })
    await queryInterface.bulkInsert("OrderProducts", dataOrderProducts)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderProducts", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    })
  }
};
