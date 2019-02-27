/**
 * Gets directions list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let data = req.query;
    let lang = data.lang;
    let result = await to(Directions.findAll({
        attributes: ['id', 'name_en', `name_${lang}`],
        include: [
            {
                model: Provinces, where: {name_en: data.parent_name}, include: [
                    {model: Countries}
                ]
            },

        ],
        order: [`name_${lang}`]
    }), res);
    res.json(result)
};

/**
 * Gets a direction by name
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getByName = async (req, res) => {
    let data = req.query;
    let lang = data.lang;

    let result = await to(Directions.findOne({
        where: {name_en: cleanString(data.name_en)},
        attributes: ['id', 'name_en', 'name_ru', 'name_hy', `description_${lang}`, 'flag_img'],
        include: [
            {
                model: Provinces,attributes: ['name_en'], include: [
                    {model: Countries, attributes: ['name_en']}
                ]
            }
        ]
    }), res);

    res.json(result);
};

exports.add = async (req, res) => {

};

exports.update = async (req, res) => {

};

exports.remove = async (req, res) => {

};