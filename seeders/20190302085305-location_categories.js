'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('loc_categories', [
            {
                name_en: 'All',
                name_ru: 'Все',
                name_hy: 'Բոլորը',
                icon: 'ban'
            },
            {
                name_en: 'Parks',
                name_ru: 'Парки',
                name_hy: 'Զբոսայգիներ',
                icon: 'tree'
            },
            {
                name_en: 'Churches',
                name_ru: 'Церкви',
                name_hy: 'Եկեղեցիներ',
                icon: 'church'
            },
            {
                name_en: 'Theatres',
                name_ru: 'Театры',
                name_hy: 'Թատրոններ',
                icon: 'theater-masks'
            },
            {
                name_en: 'Museums',
                name_ru: 'Музеи',
                name_hy: 'Թանգարաններ',
                icon: 'gopuram'
            },

            {
                name_en: 'Cinema',
                name_ru: 'Кинотеатры',
                name_hy: 'Կինոթատրոններ',
                icon: 'film'
            },
            {
                name_en: 'Monuments',
                name_ru: 'Памятники',
                name_hy: 'Հուշարձաններ',
                icon: 'monument'
            },

            {
                name_en: 'Metropolitan',
                name_ru: 'Метрополитен',
                name_hy: 'Մետրոպոլիտեն',
                icon: 'subway'
            },
            {
                name_en: 'Railway',
                name_ru: 'Железная дорога',
                name_hy: 'Երկաթգիծ',
                icon: 'train'
            },
            {
                name_en: 'Squares',
                name_ru: 'Площади',
                name_hy: 'Հրապարակներ',
                icon: 'archway'
            },
            {
                name_en: 'Water structures',
                name_ru: 'Водные сооружения',
                name_hy: 'Ջրային կառույցներ',
                icon: 'tint'
            },
            {
                name_en: 'Buildings',
                name_ru: 'Здания',
                name_hy: 'Շենքեր',
                icon: 'building'
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('loc_categories', null, {});
    }
};
