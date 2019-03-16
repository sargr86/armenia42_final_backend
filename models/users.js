'use strict';
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        status_id: DataTypes.INTEGER,
        first_name_en: DataTypes.STRING,
        last_name_en: DataTypes.STRING,
        first_name_ru: DataTypes.STRING,
        last_name_ru: DataTypes.STRING,
        first_name_hy: DataTypes.STRING,
        last_name_hy: DataTypes.STRING,
        birthday: DataTypes.DATEONLY,
        gender: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        profile_img: DataTypes.STRING
    }, {underscored: true});
    users.associate = function (models) {
        users.belongsToMany(models.roles, {through: models.users_roles, foreignKey: 'user_id'});
        users.belongsTo(models.users_statuses, {foreignKey: 'status_id'});
        users.hasMany(models.stories,{foreignKey:'user_id'});
        users.hasMany(models.images,{foreignKey:'user_id'});
        users.hasMany(models.locations,{foreignKey:'user_id'})
    };
    return users;
};