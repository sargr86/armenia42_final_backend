require('../constants/sequelize');
require('../constants/helpers');

/**
 * Gets countries list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async(req,res)=>{
    let data = req.query;
    let lang = data.lang;
    let result = await to(Countries.findAll({attributes:['id','name_en',`name_${lang}`]}),res);
    res.json(result)
};