'use strict';
const fse = require('fs-extra');
require('../constants/main');

module.exports = {
    up: (queryInterface, Sequelize) => {

        // Setting default countries list
        let countries = [
            {
                name_en: 'Armenia',
                name_ru: 'Армения',
                name_hy: 'Հայաստան',
            },
            {
                name_en: 'Georgia',
                name_ru: 'Грузия',
                name_hy: 'Վրաստան',
            },
            {
                name_en: 'Russia',
                name_ru: 'Россия',
                name_hy: 'Ռուսաստան',
            }
        ];


        // Creating default folders for the default countries
        countries.map(c => {
            fse.ensureDir(`${OTHER_UPLOADS_FOLDER}${c['name_en']}`.replace(' ', '_'));
        });


        return queryInterface.bulkInsert('countries', countries)

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('countries', null, {});
    }
}
;
