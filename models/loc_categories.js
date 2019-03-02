'use strict';
module.exports = (sequelize, DataTypes) => {
    let loc_categories = sequelize.define('loc_categories', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name_en: DataTypes.STRING,
        name_ru: DataTypes.STRING,
        name_hy: DataTypes.STRING,
        icon: DataTypes.STRING
    }, {timestamps: false});
    loc_categories.associate = function (models) {
        loc_categories.belongsToMany(models.locations, {
            through: models.loc_cats,
            foreignKey: 'category_id',
            targetKey: 'id'
        }, {underscored: true})
    };
    return loc_categories;
};