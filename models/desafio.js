'use strict';
module.exports = (sequelize, DataTypes) => {
  const desafio = sequelize.define('desafio', {
    equipe: DataTypes.STRING,
    link: DataTypes.STRING,
    modalidade: DataTypes.STRING,
    validar: DataTypes.INTEGER
  }, {});
  desafio.associate = function(models) {
    // associations can be defined here
  };
  return desafio;
};