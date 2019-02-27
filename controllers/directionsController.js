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