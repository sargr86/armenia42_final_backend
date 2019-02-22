require('../constants/sequelize')

const rules = [
    body().custom(async (req) => {
        let lang = req.lang;

        // Retrieving a user with request email
        let country = await Countries.findOne({
            where: {
                $or: [
                    {
                        name_en: req['name_' + lang]
                    },
                    {
                        name_ru: req['name_' + lang]
                    },
                    {
                        name_hy: req['name_' + lang]
                    }
                ]
            }

        });

        // Checking if user wrote first name and last name
        if (req['name_' + lang] === '') {
            throw new Error('country_name_required_error')
        }
        // Checking if user's email exists
        else if (country != null) throw new Error('country_exists_error');

        else return true;
    }),


];

module.exports = {
    rules
};