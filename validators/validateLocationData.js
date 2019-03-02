require('../constants/sequelize');

const rules = [
    body().custom(async (req) => {
        let lang = req.lang;

        if (req.category_ids === "") {
            throw new Error('location_category_required_error')
        }

        // Checks to see if a country with requested name exist (only for add-country case)
        if (!('id' in req)) {
            // Retrieving a user with request email
            let location = await Locations.findOne({
                where: {
                    $or: [
                        {name_en: req['name_' + lang]},
                        {name_ru: req['name_' + lang]},
                        {name_hy: req['name_' + lang]}
                    ]
                }

            });
            // Checking if country exists
            if (location != null) throw new Error('location_exists_error');

        }


        // Checking if user wrote country name
        if (req['name_' + lang] === '') {
            throw new Error('location_name_required_error')
        }


        else return true;
    }),


];

module.exports = {
    rules
};