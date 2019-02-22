'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('countries', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cover_id: {
                type: Sequelize.INTEGER
            },
            name_en: {
                type: Sequelize.STRING
            },
            name_ru: {
                type: Sequelize.STRING
            },
            name_hy: {
                type: Sequelize.STRING
            },
            description_en: {
                type: Sequelize.STRING
            },
            description_ru: {
                type: Sequelize.STRING
            },
            description_hy: {
                type: Sequelize.STRING
            },
            flag_img: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('countries');
    }
};