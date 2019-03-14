/**
 * Gets provinces list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {

    // Getting request data
    let data = req.query;
    let lang = data.lang;
    let cat_id = data.cat_id;
    let where;

    // Appending category condition to the query
    if (cat_id) {
        where = sequelize.where(sequelize.col('locations->loc_categories->loc_cats.category_id'), cat_id);
    }


    let result = await to(Provinces.findAll({
        attributes: ['id', 'name_en', `name_${lang}`],
        include: [
            {model: Countries, where: {name_en: data.parent_name}},
            {
                model: Locations, attributes: ['name_en'], include: [
                    {model: Categories, attributes: ['name_en']}
                ]
            }
        ],
        where,
        order: [`name_${lang}`]
    }), res);
    res.json(result)
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
        where: {name_en: cleanString(data.province, true)},
        attributes: ['id', 'name_en', 'name_ru', 'name_hy', `description_${lang}`, 'flag_img', 'cover_id'],
        include: [
            {
                model: Countries,
                attributes: ['name_en', 'name_ru', 'name_hy'],
                where: {name_en: cleanString(data.country, true)}
            },
            {
                model: Images, attributes: ['id','name'], required: false,
                // where: [{where: sequelize.where(sequelize.col('`images`.`id`'), sequelize.col('`directions`.`cover_id`'))}]
            },
        ],
    }), res);

    let ret = prepareResult(result, req);

    res.json(ret);
};


/**
 * Gets province images
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getImages = async (req, res) => {
    let result = await getItemImages(req,{country_id: req.query.parent_id});
    res.json(result);
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

            // Creating the provinces folder and translating name and description of province
            let names = await createFolder(data);
            let descriptions = await translateHelper(data['description_' + lang], lang, 'description');

            // Retrieving country by folder name
            let country = await Countries.findOne({
                where: {name_en: data.folder.replace(/\//g, "")},
                attributes: ['id']
            });

            // If retrieved adding the province to it, otherwise throwing an error
            if (country && country['id']) {
                data.country_id = country['id'];
                // Adding the country data to db
                let result = await to(Provinces.create({...data, ...names, ...descriptions}), res);
                res.json(result);
            }
            else {
                res.status(500).json('country_not_found_error')
            }

        }
    })

};
/**
 * Updates province info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
    let data = req.body;
    uploadFlag(req, res, async (err) => {

        if (!hasValidationErrors(req, res, err)) {

            // Retrieving country by folder name
            let country = await Countries.findOne({where: {name_en: data.parent_name}, attributes: ['id']});

            // If it is retrieved adding the province to it, otherwise throwing an error
            if (country && country['id']) {
                data.country_id = country['id'];


                let oldFolder = folderName(data['folder']);
                let newFolder = folderName(data['new_folder']);

                // Renaming the province folder here
                if (data['name_en'] && compareFolders(oldFolder, newFolder)) {

                    let error = await renameFolder(OTHER_UPLOADS_FOLDER + oldFolder, OTHER_UPLOADS_FOLDER + newFolder);
                    if (error) res.status(500).json(error);
                }

                // Updating province name in db
                if (!res.headersSent) {
                    let {id, country_id, ...details} = data;

                    let result = await to(Provinces.update(details, {where: {id: data.id}}));
                    res.json(result)
                }

            }
            else {
                res.status(500).json('country_not_found')
            }

        }
    })
};

/**
 * Removes a province info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.remove = async (req, res) => {
    let data = req.query;
    let withFolder = data.with_folder;

    // Removing the corresponding folder as well if the option is selected in the country form
    if (withFolder === '1') {
        let provinceFolder = OTHER_UPLOADS_FOLDER + folderName(data['folder']);

        let error = removeFolder(provinceFolder);
        if (error) res.status(500).json(error);
    }

    // Removing country data if there is no error previously
    if (!req.headersSent) {
        let result = await to(Provinces.destroy({where: {id: data.id}}));
        res.json(result);
    }
};