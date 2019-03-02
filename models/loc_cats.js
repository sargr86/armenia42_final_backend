'use strict';
module.exports = (sequelize, DataTypes) => {
  const loc_cats = sequelize.define('loc_cats', {
    location_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {});
  loc_cats.associate = function(models) {
    // associations can be defined here
  };
  return loc_cats;
};