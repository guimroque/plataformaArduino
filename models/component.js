'use strict';
module.exports = (sequelize, DataTypes) => {
  const component = sequelize.define('component', {
    nome: DataTypes.STRING,
    capa: DataTypes.STRING,
    exemplo: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {});
  component.associate = function(models) {
    // associations can be defined here
  };
  return component;
};