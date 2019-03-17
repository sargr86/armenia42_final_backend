
const translate = require('@vitalets/google-translate-api');
require('../constants/helpers')

/**
 * Translating selected item to other defined languages
 * @param str
 * @param from
 * @param field
 * @returns {Promise<*>}
 */
module.exports = async (str,from,field) => {
    let langs = ['en', 'ru', 'hy'];
    let r = langs.map(async (lang) => {
        let res = await translate(str, {to: lang});
        return {name:field+'_'+lang,res:(field ==='description'?res['text']:cleanString(res['text']))};
    });


    const results  = await Promise.all(r);

    // Converting array of objects to one object here
    let object = results.reduce((obj, item) => (obj[item.name] = item.res, obj) ,{});

    return await object;

};