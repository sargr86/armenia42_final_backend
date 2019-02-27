'use strict';

const fse = require('fs-extra');
module.exports = {
    async up (queryInterface, Sequelize) {
        // Cities data
        let directions = [
            {
                name_en: 'Yerevan',
                name_ru: 'Ереван',
                name_hy: 'Երևան',
                province:'Yerevan',
                country:'Armenia'
            },
            {
                name_en: 'Gyumri',
                name_ru: 'Гюмри',
                name_hy: 'Գյումրի',
                province:'Shirak',
                country:'Armenia'
            },
            {
                name_en: 'Vanadzor',
                name_ru: 'Ванадзор',
                name_hy: 'Վանաձոր',
                province:'Lori',
                country:'Armenia'
            },
            {
                name_en: 'Ijevan',
                name_ru: 'Иджеван',
                name_hy: 'Իջևան',
                province:'Tavush',
                country:'Armenia'
            },
            {
                name_en: 'Dilijan',
                name_ru: 'Дилижан',
                name_hy: 'Դիլիջան',
                province:'Tavush',
                country:'Armenia'
            },
            {
                name_en: 'Kapan',
                name_ru: 'Капан',
                name_hy: 'Կապան',
                province:'Syunik',
                country:'Armenia'
            },
            {
                name_en: 'Hrazdan',
                name_ru: 'Раздан',
                name_hy: 'Հրազդան',
                province:'Kotayk',
                country:'Armenia'
            },
            {
                name_en: 'Gavar',
                name_ru: 'Гавар',
                name_hy: 'Գավառ',
                province:'Gegharkunik',
                country:'Armenia'
            },
            {
                name_en: 'Armavir',
                name_ru: 'Армавир',
                name_hy: 'Արմավիր',
                province:'Armavir',
                country:'Armenia'
            },
            {
                name_en: 'Artashat',
                name_ru: 'Арташат',
                name_hy: 'Արտաշատ',
                province:'Ararat',
                country:'Armenia'
            },
            {
                name_en: 'Ashtarak',
                name_ru: 'Аштарак',
                name_hy: 'Աշտարակ',
                province:'Aragatsotn',
                country:'Armenia'
            },
            {
                name_en: 'Yeghegnadzor',
                name_ru: 'Ехегнадзор',
                name_hy: 'Եղեգնաձոր',
                province:'Vayots Dzor',
                country:'Armenia'
            }];


        // Creating default folders for the default provinces
        directions.map( d =>{
            fse.ensureDir(OTHER_UPLOADS_FOLDER+d['country'].replace(' ','_')+'/'+d['province'].replace(' ','_')+'/'+d['name_en'].replace(' ','_'));
        });

        // Getting country id by its name
        function getCountry(country) {
            return queryInterface.rawSelect('countries', {
                where: {
                    name_en: country,
                },
            }, ['id']);
        }

        // Getting province id by its name
        function getProvince(direction) {
            return queryInterface.rawSelect('provinces', {
                where: {
                    name_en: direction,
                },
            }, ['id']);
        }
        let key = 0;
        let list;
        list = directions.map( async function(direction){
            let data;
            data = await getProvince(direction.province);
            // direction.country_id = await getCountry(direction.country);
            direction.province_id = data;
            delete directions[key]['province'];
            delete directions[key]['country'];
            ++key;
            return direction;
        });
        const results = await Promise.all(list);

        return queryInterface.bulkInsert('directions', results, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('directions', null, {});
    }
};
