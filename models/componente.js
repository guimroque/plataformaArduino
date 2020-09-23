'use strict';
module.exports = (sequelize, DataTypes) => {
  const componente = sequelize.define('componente', {
    nome: DataTypes.STRING,
    img: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {});
  componente.associate = function(models) {
    // associations can be defined here
  };
  return componente;
};