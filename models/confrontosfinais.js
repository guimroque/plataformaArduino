'use strict';
module.exports = (sequelize, DataTypes) => {
  const confrontosFinais = sequelize.define('confrontosFinais', {
    personagem: DataTypes.STRING,
    equipe: DataTypes.STRING,
    texto: DataTypes.STRING
  }, {});
  confrontosFinais.associate = function(models) {
    // associations can be defined here
  };
  return confrontosFinais;
};