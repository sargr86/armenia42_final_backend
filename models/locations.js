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
        flag_img: DataTypes.STRING
    }, {underscored: true, timestamps: false});
    locations.associate = function (models) {
        // associations can be defined here
        locations.belongsTo(models.directions);
        locations.belongsToMany(models.loc_categories, {
            through: models.loc_cats,
            foreignKey: 'location_id',
            targetKey: 'id'
        }, {underscored: true});
        locations.hasMany(models.stories, {foreignKey: "location_id"});
    };
    return locations;
};