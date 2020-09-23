'use strict';
module.exports = (sequelize, DataTypes) => {
  const confronto = sequelize.define('confronto', {
    equipe: DataTypes.STRING,
    link: DataTypes.STRING,
    admin1: DataTypes.FLOAT,
    admin2: DataTypes.FLOAT
  }, {});
  confronto.associate = function(models) {
    // associations can be defined here
  };
  return confronto;
};