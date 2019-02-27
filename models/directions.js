'use strict';
module.exports = (sequelize, DataTypes) => {
  const directions = sequelize.define('directions', {
    province_id: DataTypes.INTEGER,
    cover_id: DataTypes.INTEGER,
    name_en: DataTypes.STRING,
    name_ru: DataTypes.STRING,
    name_hy: DataTypes.STRING,
    description_en: DataTypes.TEXT,
    description_ru: DataTypes.TEXT,
    description_hy: DataTypes.TEXT,
    flag_img: DataTypes.STRING
  }, {});
    directions.associate = function(models) {
    // associations can be defined here
      directions.belongsTo(models.provinces, {foreignKey: "province_id"});
  };
  return directions;
};