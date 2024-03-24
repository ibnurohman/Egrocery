'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataUsers = require("../users.json").map(element => {
      delete element.id
      element.createdAt = new Date();
      element.updatedAt = new Date();
      return element;
    })
    await queryInterface.bulkInsert("Users", dataUsers)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdeentity: true,
      cascade: true,
    })
  }
};
