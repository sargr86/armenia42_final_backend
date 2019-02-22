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

/**
 * Adds a new country
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.add = async(req,res)=>{
    let data = req.body;
    let lang = data.lang;
    uploadCountryFlag(req, res, async (err) => {
        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        }

        // Getting multer errors if any
        else if (err) res.status(423).json(err);

        // If file validation passed, heading to the request data validation
        else {
            // Getting validation result from express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array()[0]);
            }
            let names = await translateHelper(data['name_' + lang], lang, 'name');
            let merged = {...data,...names};
            Countries.create(merged);


            res.json("OK");
        }
    })
};