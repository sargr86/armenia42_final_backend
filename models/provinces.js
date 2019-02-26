'use strict';
module.exports = (sequelize, DataTypes) => {
  const provinces = sequelize.define('provinces', {
    country_id: DataTypes.INTEGER,
    cover_id: DataTypes.INTEGER,
    name_en: DataTypes.STRING,
    name_ru: DataTypes.STRING,
    name_hy: DataTypes.STRING,
    description_en: DataTypes.STRING,
    description_ru: DataTypes.STRING,
    description_hy: DataTypes.STRING
  }, {timestamps:false});
  provinces.associate = function(models) {
    // associations can be defined here
  };
  return provinces;
};