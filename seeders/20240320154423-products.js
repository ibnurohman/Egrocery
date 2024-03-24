'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataProducts = require("../products.json").map(element => {
      delete element.id;
      element.createdAt = new Date();
      element.updatedAt = new Date();
      return element;
    })
    await queryInterface.bulkInsert("Products", dataProducts)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    })
  }
};
