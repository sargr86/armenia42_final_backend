'use strict';
module.exports = (sequelize, DataTypes) => {
    const images = sequelize.define('images', {
        user_id: DataTypes.INTEGER,
        status_id: DataTypes.INTEGER,
        country_id: DataTypes.INTEGER,
        province_id: DataTypes.INTEGER,
        direction_id: DataTypes.INTEGER,
        location_id: DataTypes.INTEGER,
        story_id: DataTypes.INTEGER,
        cover: DataTypes.INTEGER,
        fav: DataTypes.INTEGER,
        // folder: DataTypes.STRING,
        name: DataTypes.STRING,
        year: DataTypes.INTEGER,
        description_en: DataTypes.TEXT,
        description_ru: DataTypes.TEXT,
        description_hy: DataTypes.TEXT
    }, {});
    images.associate = function (models) {
        // associations can be defined here
        images.belongsTo(models.stories, {foreignKey: "story_id"});
        // images.belongsTo(models.countries, {foreignKey: "cover_id"});
        // images.belongsTo(models.directions, {foreignKey: "cover_id"});
        images.belongsTo(models.locations, {foreignKey: "location_id"});
        images.belongsTo(models.users, {foreignKey: "user_id"});
        images.belongsTo(models.review_statuses,{foreignKey: "status_id"})
    };
    return images;
};