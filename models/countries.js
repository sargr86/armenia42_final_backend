'use strict';
module.exports = (sequelize, DataTypes) => {
    const countries = sequelize.define('countries', {
        cover_id: DataTypes.INTEGER,
        name_en: DataTypes.STRING,
        name_ru: DataTypes.STRING,
        name_hy: DataTypes.STRING,
        description_en: DataTypes.STRING,
        description_ru: DataTypes.STRING,
        description_hy: DataTypes.STRING,
        flag_img: DataTypes.STRING
    }, {underscored: true,timestamps:false});
    countries.associate = function (models) {
        // associations can be defined here
        countries.hasMany(models.provinces, {foreignKey: "country_id"});
        countries.hasMany(models.images, {foreignKey: "country_id"});
        countries.hasMany(models.locations, {foreignKey: "country_id"});

    };
    return countries;
};