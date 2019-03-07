const imagesController = require('./imagesController');

/**
 * Gets stories list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let data = req.query;
    let lang = data.lang;
    let userAttributes = [];
    userAttributes.push(fullName(`first_name_${lang}`, `last_name_${lang}`));
    let result = await to(Stories.findAll({
        attributes: ['id', 'name_en', `name_${lang}`],
        include: [
            {
                model: Users, attributes: userAttributes
            },
            {
                model: Locations, where: {name_en: data.parent_name},include: [
                    {
                        model: Directions, include: [
                            {
                                model: Provinces, attributes: ['name_en'], include: [
                                    {model: Countries, attributes: ['name_en']}
                                ]
                            },
                        ]
                    }

                ]
            }


        ],
        order: [`name_${lang}`]
    }), res);
    res.json(result)
};

/**
 * Gets a story by name
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getById = async (req, res) => {
    let data = req.query;
    let lang = data.lang;

    let result = await to(Stories.findOne({

        where: {
            id: data.story,
            where: sequelize.where(sequelize.col('location.name_en'), cleanString(data.location, true))
        },
        attributes: ['id', 'name_en', 'name_ru', 'name_hy', `description_${lang}`],
        include: [
            {
                model: Locations, attributes: ['name_en', 'name_ru', 'name_hy'], include: [
                    {
                        model: Directions, attributes: ['name_en', 'name_ru', 'name_hy'], include: [
                            {
                                model: Provinces, attributes: ['name_en', 'name_ru', 'name_hy'], include: [
                                    {model: Countries, attributes: ['name_en', 'name_ru', 'name_hy']}
                                ]
                            },
                        ]
                    }

                ]
            }


        ],
    }), res);

    if (result) {
        result = result.get({plain: true});
        result['folder'] = folderUrl(result);
        result['parent_name'] = result['name_en'];
    }


    res.json(result);
};

/**
 * Adds a new story
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
            let location = await Locations.findOne({
                where: {name_en: data.parent_name},
                attributes: ['id']
            });

            // If retrieved adding the province to it, otherwise throwing an error
            if (location && location['id']) {
                data.location_id = location['id'];
                console.log(data)
                // Adding the country data to db
                let result = await to(Stories.create({...data, ...names, ...descriptions}), res);

                // Adding necessary additional fields for images adding
                data.story_id = result['id'];
                data.storyAdding = 1;
                await imagesController.add(data, res)
                // res.json(result);
            }
            else {
                res.status(500).json('location_not_found_error')
            }
        }
    })
};

/**
 * Updates the selected story
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

                let result = await to(Stories.update(details, {where: {id: data.id}}));
                res.json(result)
            }

        }
    })
};

/**
 * Removes a story
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.remove = async (req, res) => {
    let data = req.query;
    let withFolder = data.with_folder;

    // Removing the corresponding folder as well if the option is selected in the country form
    if (withFolder === '1') {
        let storyFolder = OTHER_UPLOADS_FOLDER + folderName(data['folder']);

        let error = removeFolder(storyFolder);
        if (error) res.status(500).json(error);
    }

    // Removing country data if there is no error previously
    if (!res.headersSent) {
        let result = await to(Stories.destroy({where: {id: data.id}}));
        res.json(result);
    }
};