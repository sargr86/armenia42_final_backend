'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('stories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            status_id: {
                type: Sequelize.INTEGER
            },
            location_id: {
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
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('stories');
    }
};