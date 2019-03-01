'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('locations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            direction_id: {
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
                type: Sequelize.TEXT
            },
            description_ru: {
                type: Sequelize.TEXT
            },
            description_hy: {
                type: Sequelize.TEXT
            },
            flag_img: {
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
        return queryInterface.dropTable('locations');
    }
};