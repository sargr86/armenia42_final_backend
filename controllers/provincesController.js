/**
 * Gets provinces list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let data = req.query;
    let lang = data.lang;
    let result = await to(Provinces.findAll({
        attributes: ['id', 'name_en', `name_${lang}`],
        order: [`name_${lang}`]
    }), res);
    res.json(result)
};


exports.add = async (req, res) => {

};

/**
 * Gets province by name
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getProvinceByName = async (req, res) => {
    let data = req.query;
    let lang = data.lang;

    let result = await to(Provinces.findOne({
        where: {name_en: cleanString(data.name_en)},
        attributes: ['id', 'name_en', 'name_ru', 'name_hy', `description_${lang}`]
    }), res);

    res.json(result);
};

exports.update = async (req, res) => {

};

exports.remove = async (req, res) => {

};