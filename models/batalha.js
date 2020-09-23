'use strict';
module.exports = (sequelize, DataTypes) => {
  const batalha = sequelize.define('batalha', {
    rodada: DataTypes.INTEGER,
    modalidade: DataTypes.STRING,
    equipe1: DataTypes.STRING,
    equipe2: DataTypes.STRING,
    personagem1: DataTypes.STRING,
    personagem2: DataTypes.STRING,
    contexto: DataTypes.STRING
  }, {});
  batalha.associate = function(models) {
    // associations can be defined here
  };
  return batalha;
};