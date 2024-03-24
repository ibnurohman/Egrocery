'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataOrders = require("../orders.json").map(element => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
      return element;
    })
    await queryInterface.bulkInsert("Orders", dataOrders)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    })
  }
};
