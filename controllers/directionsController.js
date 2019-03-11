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
                model: Provinces, where: {name_en: cleanString(data.parent_name, true)}, include: [
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
    console.log(data)

    let result = await to(Directions.findOne({
        where: {
            name_en: cleanString(data.direction, true)
        },
        attributes: ['id', 'name_en', 'name_ru', 'name_hy', `description_${lang}`, 'flag_img','cover_id'],
        include: [

            {
                model: Provinces, where: sequelize.where(sequelize.col('province.name_en'), cleanString(data.province)),
                attributes: ['name_en', 'name_ru', 'name_hy','country_id'], include: [
                    {model: Countries, attributes: ['name_en', 'name_ru', 'name_hy']}
                ]
            },
            {
                model: Images, attributes: ['id','name'], required: false,
                // where: [{where: sequelize.where(sequelize.col('`images`.`id`'), sequelize.col('`directions`.`cover_id`'))}]
            },
        ]
    }), res);

    let ret = prepareResult(result,req);
    res.json(ret);
};

/**
 * Adds a new direction
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
            let province = await Provinces.findOne({
                where: {name_en: data.parent_name},
                attributes: ['id']
            });

            // If retrieved adding the province to it, otherwise throwing an error
            if (province && province['id']) {
                data.province_id = province['id'];
                // Adding the country data to db
                let result = await to(Directions.create({...data, ...names, ...descriptions}), res);
                res.json(result);
            }
            else {
                res.status(500).json('province_not_found_error')
            }
        }
    })
};

/**
 * Updates a direction info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
    let data = req.body;
    uploadFlag(req, res, async (err) => {

        if (!hasValidationErrors(req, res, err)) {

            let oldFolder = folderName(data['folder']);
            let newFolder = folderName(data['new_folder']);

            // Renaming the province folder here
            if (data['name_en'] && compareFolders(oldFolder, newFolder)) {

                let error = await renameFolder(OTHER_UPLOADS_FOLDER + oldFolder, OTHER_UPLOADS_FOLDER + newFolder);
                if (error) res.status(500).json(error);
            }

            // Updating province name in db
            if (!res.headersSent) {
                let {id, ...details} = data;

                let result = await to(Directions.update(details, {where: {id: data.id}}));
                res.json(result)
            }

        }
    })
};

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
        let result = await to(Directions.destroy({where: {id: data.id}}));
        res.json(result);
    }
};