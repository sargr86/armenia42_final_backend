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
        include: {model: Countries, where: {name_en: data.parent_name}},
        order: [`name_${lang}`]
    }), res);
    res.json(result)
};


/**
 * Adds a new province to the selected country
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.add = async (req, res) => {
    let data = req.body;
    let lang = data.lang;
    uploadFlag(req, res, async (err) => {

        if (!hasValidationErrors(req, res, err)) {

            // Creating the provinces folder
            let names = await createFolder(data);
            let descriptions = await translateHelper(data['description_' + lang], lang, 'description');

            // Retrieving country by folder name
            let country = await Countries.findOne({where:{name_en:data.folder.replace(/\//g, "")},attributes:['id']});

            // If retrieved adding the province to it, otherwise throwing an error
            if(country && country['id']){
                data.country_id = country['id'];
                // Adding the country data to db
                let result = await to(Provinces.create({...data, ...names,...descriptions}), res);
                res.json(result);
            }
            else {
                res.status(500).json('country_not_found')
            }

        }
    })

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