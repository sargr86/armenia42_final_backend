/**
 * Gets locations list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let data = 'save' in req ? req : req.query;
    let lang = data.lang;
    let cat_id = data.cat_id;
    let where;

    // Appending category condition to the query
    if (cat_id) {
        where = sequelize.where(sequelize.col('loc_categories->loc_cats.category_id'), cat_id);
    }

    let result = await to(Locations.findAll({
        attributes: ['id', 'name_en', `name_${lang}`],
        include: [
            {
                model: Categories,
                attributes: ['id', ['name_' + data.lang, 'label']],
                through: {attributes: []},
                required: false
            },
            {
                model: Directions, where: {name_en: data.parent_name},
                attributes: ['name_en', `name_${lang}`], include: [
                    {
                        model: Provinces, attributes: ['name_en'], include: [
                            {model: Countries, attributes: ['name_en']}
                        ]
                    },
                ]
            },
            {
                model:Users,attributes:['email']
            }


        ],
        where,
        order: [`name_${lang}`]
    }), res);

    if (!res.headersSent) {
        res.json(result)
    }
};

/**
 * Gets location images
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getImages = async (req, res) => {
    let result = await getItemImages(req,{direction_id: req.query.parent_id});
    res.json(result);
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

    let result = await to(Locations.findOne({

        where: {
            name_en: cleanString(data.location),
            where: sequelize.where(sequelize.col('direction.name_en'), cleanString(data.direction))
        },
        attributes: ['id', 'name_en', 'name_ru', 'name_hy', `description_${lang}`, 'flag_img', 'cover_id'],
        include: [

            {
                model: Categories,
                attributes: [['id', 'value'], ['name_' + data.lang, 'label']],
                through: {attributes: []},
                required: false
            },
            {
                model: Images, attributes: ['id', 'name'], required: false,
                where: [{where: sequelize.where(sequelize.col('`images`.`id`'), sequelize.col('`locations`.`cover_id`'))}]
            },
            {
                model: Directions, where: {name_en: data.direction},
                attributes: ['name_en', 'name_ru', 'name_hy', 'province_id'], include: [
                    {
                        model: Provinces, attributes: ['name_en', 'name_ru', 'name_hy'], include: [
                            {model: Countries, attributes: ['name_en', 'name_ru', 'name_hy']}
                        ]
                    },
                ]
            }]
    }), res);

    let ret = prepareResult(result, req);
    res.json(ret);
};

/**
 * Adds a new location
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
            let direction = await Directions.findOne({
                where: {name_en: data.parent_name},
                attributes: ['id']
            });

            // If retrieved adding the province to it, otherwise throwing an error
            if (direction && direction['id']) {
                data.direction_id = direction['id'];

                // Getting the direction with its parents by id
                let directionRes = await Directions.findOne({
                    where: {id: direction['id']},
                    include: [
                        {
                            model: Provinces, attributes: ['id'], include: {
                                model: Countries, attributes: ['id']
                            }
                        }
                    ]
                });

                // Grabbing ids from the selected story
                let directionData = directionRes.toJSON();
                data.province_id = directionData.province.id;
                data.country_id = directionData.province.country.id;

                // Adding the country data to db
                let result = await to(Locations.create({...data, ...names, ...descriptions}), res);

                this.saveLocationInfo(data, res, result);

                if (!res.headersSent) {

                    res.json(result);
                }
            }
            else {
                res.status(500).json('direction_not_found_error')
            }
        }
    })
};

/**
 * Updates the selected location
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

                let result = await to(Locations.update(details, {where: {id: data.id}}));

                // let data = {id: req.body.id};
                this.saveLocationInfo(data, res, result);

            }

        }
    })
};


/**
 * Saves location categories info
 * @param data
 * @param res
 * @param d
 */
exports.saveLocationInfo = async (data, res, d) => {
    let cat_ids = data.category_ids.split(',').filter(n => n);
    let dt = {};

    if ('id' in data) {
        d.id = data.id;
    }

    // Processing each category id
    let counter = 0;

    // Clearing categories and locations relation for the current location and category
    await to(LocCats.destroy({where: {location_id: d.id}}));

    cat_ids.map((cat_id) => {


        dt.category_id = cat_id;
        dt.location_id = d.id;

        // Creating new relations for the current location
        LocCats.create(dt).then(() => {
            ++counter;
            if (counter === cat_ids.length) {
                data.save = 1;
                this.get(data, res, true)
            }
        });
    })

};


/**
 * Removes a location
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
    if (!res.headersSent) {
        let result = await to(Locations.destroy({where: {id: data.id}}));
        await to(LocCats.destroy({where: {location_id: data.id}}))
        res.json(result);
    }
};