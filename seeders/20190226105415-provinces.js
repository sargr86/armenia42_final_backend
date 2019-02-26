'use strict';

const fse = require('fs-extra');
module.exports = {
    async up(queryInterface, Sequelize) {

        // Armenia provinces list
        let provinces = [
            {
                name_en: 'Aragatsotn',
                name_ru: 'Арагацотн',
                name_hy: 'Արագածոտն',
                country:'Armenia'
            },
            {
                name_en: 'Ararat',
                name_ru: 'Арарат',
                name_hy: 'Արարատ',
                country:'Armenia'
            },
            {
                name_en: 'Armavir',
                name_ru: 'Армавир',
                name_hy: 'Արմավիր',
                country:'Armenia'
            },
            {
                name_en: 'Gegharkunik',
                name_ru: 'Гехаркуник',
                name_hy: 'Գեղարքունիք',
                country:'Armenia'
            },
            {
                name_en: 'Kotayk',
                name_ru: 'Котайк',
                name_hy: 'Կոտայք',
                country:'Armenia'
            },
            {
                name_en: 'Lori',
                name_ru: 'Лори',
                name_hy: 'Լոռի',
                country:'Armenia'
            },
            {
                name_en: 'Shirak',
                name_ru: 'Ширак',
                name_hy: 'Շիրակ',
                country:'Armenia'
            },
            {
                name_en: 'Syunik',
                name_ru: 'Сюник',
                name_hy: 'Սյունիք',
                country:'Armenia'
            },
            {
                name_en: 'Tavush',
                name_ru: 'Тавуш',
                name_hy: 'Տավուշ',
                country:'Armenia'
            },
            {
                name_en: 'Vayots Dzor',
                name_ru: 'Вайоц дзор',
                name_hy: 'Վայոց Ձոր',
                country:'Armenia'
            },
            {
                name_en: 'Yerevan',
                name_ru: 'Ереван',
                name_hy: 'Երևան',
                country:'Armenia'
            }
        ];


        // Creating default folders for the default provinces
        provinces.map( p =>{
            fse.ensureDir(OTHER_UPLOADS_FOLDER+p['country'].replace(' ','_')+'/'+p['name_en'].replace(' ','_'));
        });



        // Getting country id by its name
        function getCountry(country) {
            return queryInterface.rawSelect('countries', {
                where: {
                    name_en: country,
                },
            }, ['id']);
        }

        let key = 0;
        let list;
        list = provinces.map(async function (province) {
            let data;
            data = await getCountry(province.country);
            province.country_id = data;
            delete provinces[key]['country'];
            ++key;
            return province;
        });

        const results = await Promise.all(list);

        return queryInterface.bulkInsert('provinces', results, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('provinces', null, {});
    }
};
