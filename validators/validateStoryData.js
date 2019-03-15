require('../constants/sequelize');

const rules = [
    body().custom(async (req) => {
        let lang = req.lang;

        // Checks to see if a country with requested name exist (only for add-country case)
        if (!('id' in req)) {
            // Retrieving a user with request email
            let story = await Stories.findOne({
                where: {
                    $or: [
                        {name_en: req['name_' + lang]},
                        {name_ru: req['name_' + lang]},
                        {name_hy: req['name_' + lang]}
                    ]
                },
                include:{
                    model: Locations, where:{  name_en: req.parent_name}
                }

            });
            // Checking if country exists
            if (story != null) throw new Error('story_exists_error');

        }


        // Checking if user wrote country name
        if (req['name_' + lang] === '') {
            throw new Error('story_name_required_error')
        }


        else return true;
    }),


];

module.exports = {
    rules
};