'use strict';
module.exports = (sequelize, DataTypes) => {
    const directions = sequelize.define('directions', {
        user_id: DataTypes.INTEGER,
        province_id: DataTypes.INTEGER,
        cover_id: DataTypes.INTEGER,
        name_en: DataTypes.STRING,
        name_ru: DataTypes.STRING,
        name_hy: DataTypes.STRING,
        description_en: DataTypes.TEXT,
        description_ru: DataTypes.TEXT,
        description_hy: DataTypes.TEXT,
        flag_img: DataTypes.STRING
    }, {underscored: true, timestamps: false});
    directions.associate = function (models) {
        // associations can be defined here
        directions.belongsTo(models.provinces, {foreignKey: "province_id"});
        directions.hasMany(models.images, {foreignKey: "direction_id"});
        directions.hasMany(models.locations, {foreignKey: "direction_id"});
        directions.belongsTo(models.users, {foreignKey: "user_id"});
    };
    return directions;
};