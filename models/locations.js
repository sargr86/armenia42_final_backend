'use strict';
module.exports = (sequelize, DataTypes) => {
    const locations = sequelize.define('locations', {
        direction_id: DataTypes.INTEGER,
        cover_id: DataTypes.INTEGER,
        name_en: DataTypes.STRING,
        name_ru: DataTypes.STRING,
        name_hy: DataTypes.STRING,
        description_en: DataTypes.TEXT,
        description_ru: DataTypes.TEXT,
        description_hy: DataTypes.TEXT,
        flag_img:DataTypes.STRING
    }, {underscored: true,timestamps:false});
    locations.associate = function (models) {
        // associations can be defined here
        locations.belongsTo(models.directions);
    };
    return locations;
};