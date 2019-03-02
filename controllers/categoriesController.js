/**
 * Gets categories list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async(req, res) => {
    let data = req.query;
    let lang = data.lang || 'en';
    let all = data.all;
    let fields = [['name_' + lang, 'label'], ['id', 'value'], 'icon'];

    // Where condition
    let where = {};
    if (all === '0') {
        where = {
            'name_en': {
                [Op.ne]: 'All'
            }
        };
    }


    let result = await to(Categories.findAll(
        {
            attributes: fields,
            where: where
        }
    ));

    res.json(result);
};