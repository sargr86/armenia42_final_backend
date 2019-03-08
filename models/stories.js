'use strict';
module.exports = (sequelize, DataTypes) => {
    const stories = sequelize.define('stories', {
        user_id: DataTypes.INTEGER,
        location_id: DataTypes.INTEGER,
        cover_id: DataTypes.INTEGER,
        name_en: DataTypes.STRING,
        name_ru: DataTypes.STRING,
        name_hy: DataTypes.STRING,
        description_en: DataTypes.TEXT,
        description_ru: DataTypes.TEXT,
        description_hy: DataTypes.TEXT
    }, {underscored: true});
    stories.associate = function (models) {
        // associations can be defined here
        stories.belongsTo(models.locations, {foreignKey: "location_id"});
        stories.belongsTo(models.users, {foreignKey: "user_id"});
        stories.hasMany(models.images, {foreignKey: "story_id"});
    };
    return stories;
};