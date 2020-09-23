'use strict';
module.exports = (sequelize, DataTypes) => {
  const final = sequelize.define('final', {
    equipe: DataTypes.STRING,
    link: DataTypes.STRING,
    modalidade: DataTypes.STRING,
    nota: DataTypes.FLOAT
  }, {});
  final.associate = function(models) {
    // associations can be defined here
  };
  return final;
};