'use strict';
module.exports = (sequelize, DataTypes) => {
  const teste = sequelize.define('teste', {
    nome: DataTypes.STRING
  }, {});
  teste.associate = function(models) {
    // associations can be defined here
  };
  return teste;
};