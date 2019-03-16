'use strict';
module.exports = (sequelize, DataTypes) => {
  const review_statuses = sequelize.define('review_statuses', {
    name_en: DataTypes.STRING,
    name_ru: DataTypes.STRING,
    name_hy: DataTypes.STRING
  }, {timestamps:false});
  review_statuses.associate = function(models) {
    // associations can be defined here
  };
  return review_statuses;
};