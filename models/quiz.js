'use strict';
module.exports = (sequelize, DataTypes) => {
  const quiz = sequelize.define('quiz', {
    equipe: DataTypes.STRING,
    nota: DataTypes.FLOAT,
    componente1: DataTypes.STRING,
    componente2: DataTypes.STRING,
    componente3: DataTypes.STRING,
    componente4: DataTypes.STRING,
    componente5: DataTypes.STRING,
    componente6: DataTypes.STRING,
    componente7: DataTypes.STRING,
    componente8: DataTypes.STRING,
    componente9: DataTypes.STRING,
    componente10: DataTypes.STRING,
    componente11: DataTypes.STRING
  }, {});
  quiz.associate = function(models) {
    // associations can be defined here
  };
  return quiz;
};