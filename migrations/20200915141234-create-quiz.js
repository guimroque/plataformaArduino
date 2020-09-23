'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('quizzes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      equipe: {
        type: Sequelize.STRING
      },
      nota: {
        type: Sequelize.FLOAT
      },
      componente1: {
        type: Sequelize.STRING
      },
      componente2: {
        type: Sequelize.STRING
      },
      componente3: {
        type: Sequelize.STRING
      },
      componente4: {
        type: Sequelize.STRING
      },
      componente5: {
        type: Sequelize.STRING
      },
      componente6: {
        type: Sequelize.STRING
      },
      componente7: {
        type: Sequelize.STRING
      },
      componente8: {
        type: Sequelize.STRING
      },
      componente9: {
        type: Sequelize.STRING
      },
      componente10: {
        type: Sequelize.STRING
      },
      componente11: {
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
    return queryInterface.dropTable('quizzes');
  }
};