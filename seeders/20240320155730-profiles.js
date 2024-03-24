'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataProfiles = require("../profiles.json").map(element => {
      delete element.id;
      element.createdAt = new Date();
      element.updatedAt = new Date();
      return element;
    })
    await queryInterface.bulkInsert("Profiles", dataProfiles)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    })
  }
};
