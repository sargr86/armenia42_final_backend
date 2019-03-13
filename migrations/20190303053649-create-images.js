'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('images', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            country_id: {
                type: Sequelize.INTEGER
            },
            province_id: {
                type: Sequelize.INTEGER
            },
            direction_id: {
                type: Sequelize.INTEGER
            },
            location_id: {
                type: Sequelize.INTEGER
            },
            story_id: {
                type: Sequelize.INTEGER
            },
            cover: {
                type: Sequelize.INTEGER
            },
            fav: {
                type: Sequelize.INTEGER
            },
            folder: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            description_en: {
                type: Sequelize.TEXT
            },
            description_ru: {
                type: Sequelize.TEXT
            },
            description_hy: {
                type: Sequelize.TEXT
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
        return queryInterface.dropTable('images');
    }
};