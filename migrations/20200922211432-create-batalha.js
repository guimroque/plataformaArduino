'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('batalhas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rodada: {
        type: Sequelize.INTEGER
      },
      modalidade: {
        type: Sequelize.STRING
      },
      equipe1: {
        type: Sequelize.STRING
      },
      equipe2: {
        type: Sequelize.STRING
      },
      personagem1: {
        type: Sequelize.STRING
      },
      personagem2: {
        type: Sequelize.STRING
      },
      contexto: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('batalhas');
  }
};