require('../constants/sequelize');

const rules = [
    body().custom(async (req) => {
        let lang = req.lang;

        // Checks to see if a country with requested name exist (only for add-country case)
        if (!('id' in req)) {
            // Retrieving a user with request email
            let province = await Provinces.findOne({
                where: {
                    $or: [
                        {name_en: req['name_' + lang]},
                        {name_ru: req['name_' + lang]},
                        {name_hy: req['name_' + lang]}
                    ]
                }

            });
            // Checking province email exists
            if (province != null) throw new Error('province_exists_error');

        }


        // Checking if user wrote province name
        if (req['name_' + lang] === '') {
            throw new Error('province_name_required_error')
        }


        else return true;
    }),


];

module.exports = {
    rules
};