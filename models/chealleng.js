'use strict';
module.exports = (sequelize, DataTypes) => {
  const chealleng = sequelize.define('chealleng', {
    mission: DataTypes.STRING,
    equipe: DataTypes.STRING,
    link: DataTypes.STRING,
    modalidade: DataTypes.STRING,
    validar: DataTypes.INTEGER
  }, {});
  chealleng.associate = function(models) {
    // associations can be defined here
  };
  return chealleng;
};