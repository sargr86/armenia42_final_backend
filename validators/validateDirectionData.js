require('../constants/sequelize');

const rules = [
    body().custom(async (req) => {
        let lang = req.lang;

        // Checks to see if a country with requested name exist (only for add-country case)
        if (!('id' in req)) {

            // Retrieving a user with request email
            let province = await Directions.findOne({
                where: {
                    $or: [
                        {name_en: req['name_' + lang]},
                        {name_ru: req['name_' + lang]},
                        {name_hy: req['name_' + lang]}
                    ]
                },
                include:{
                    model: Provinces, where:{  name_en: req.parent_name}
                }

            });
            // Checking province email exists
            if (province != null) throw new Error('direction_exists_error');

        }


        // Checking if user wrote province name
        if (req['name_' + lang] === '') {
            throw new Error('direction_name_required_error')
        }


        else return true;
    }),


];

module.exports = {
    rules
};