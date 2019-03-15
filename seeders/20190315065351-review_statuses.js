'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        let statuses = [
            {
                name_en: 'pending',
                name_ru: 'в ожидании',
                name_hy: 'ընթացքում',
            },
            {
                name_en: 'rejected',
                name_ru: 'отвергнуто',
                name_hy: 'մերժված',
            },
            {
                name_en: 'accepted',
                name_ru: 'принято',
                name_hy: 'ընդունված',
            }
        ];
        return queryInterface.bulkInsert('review_statuses', statuses, {});
    },


    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('review_statuses', null, {});
    }
};
