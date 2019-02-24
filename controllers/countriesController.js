require('../constants/sequelize');
require('../constants/helpers');

const hasValidationErrors = require('../helpers/hasValidationErrors');

/**
 * Gets countries list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let data = req.query;
    let lang = data.lang;
    let result = await to(Countries.findAll({attributes: ['id', 'name_en', `name_${lang}`]}), res);
    res.json(result)
};

/**
 * Adds a new country
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.add = async (req, res) => {
    let data = req.body;
    let lang = data.lang;
    uploadCountryFlag(req, res, async (err) => {

        if (!hasValidationErrors(req, res, err)) {
            let names = await translateHelper(data['name_' + lang], lang, 'name');

            // Creating the country folder if not exist (maybe creating during multer validation checks by me)
            fse.ensureDir(OTHER_UPLOADS_FOLDER + folderName(names['name_en']));

            // Adding the country data to db
            let result = await to(Countries.create({...data, ...names}), res);
            res.json(result);
        }
    })
};


/**
 * Gets country data by its name
 * @param req
 * @param res
 */
exports.getCountryByName = async (req, res) => {
    let data = req.query;
    let lang = data.lang;

    let result = await to(Countries.findOne({
        where: {name_en: cleanString(data.name_en)},
        attributes: ['id', 'name_en', 'name_ru', 'name_hy','description_' + lang, 'flag_img']
    }), res);

    res.json(result);
};

/**
 * Updates a country data
 * @param req
 * @param res
 */
exports.update = async(req, res) => {
    let data = req.body;
    let lang = data.lang;

    let names = await translateHelper(data['name_' + lang], lang, 'name');

    let oldFolder = OTHER_UPLOADS_FOLDER +folderName(data['folder']).replace(/\//g,"\\");
    let newFolder = OTHER_UPLOADS_FOLDER +folderName(names['name_en']).replace(/\//g,"\\");
console.log(oldFolder)
    console.log(newFolder)
    // uploadCountryFlag(req, res, async (err) => {
    //     if (!hasValidationErrors(req, res, err)) {
    //         let {id, ...details} = data;
    //
    //         let result = await to(Countries.update(details, {where: {id: data.id}}));
    //         res.json(result)
    //     }
    // })
};


/**
 * Removes a country data
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.remove = async (req, res) => {
    let data = req.query;

    let country = await Countries.findOne({where: {id: data.id}});
    let countryFolder = OTHER_UPLOADS_FOLDER + folderName(country['name_en']);

    let error = removeFolder(countryFolder);
    if(error) res.status(500).json(result);

    else {
        // let result = await to(Countries.destroy({where: {id: data.id}}));
        // res.json(result);
    }


};