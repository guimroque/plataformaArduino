'use strict';
module.exports = (sequelize, DataTypes) => {
  const humano = sequelize.define('humano', {
    nome: DataTypes.STRING,
    img: DataTypes.STRING,
    idade: DataTypes.INTEGER,
    habilidades: DataTypes.STRING,
    hobiies: DataTypes.TEXT
  }, {});
  humano.associate = function(models) {
    // associations can be defined here
  };
  return humano;
};