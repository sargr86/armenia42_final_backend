'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    country_id: DataTypes.INTEGER,
    province_id: DataTypes.INTEGER,
    direction_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    story_id: DataTypes.INTEGER,
    cover: DataTypes.INTEGER,
    fav: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description_en: DataTypes.TEXT,
    description_ru: DataTypes.TEXT,
    description_hy: DataTypes.TEXT
  }, {});
  images.associate = function(models) {
    // associations can be defined here
  };
  return images;
};