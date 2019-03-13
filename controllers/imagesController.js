/**
 * Gets images list of the selected story
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    let data = req.query;
    let lang = data.lang;
    let result = await to(Images.findAll({
        // attributes:['id','country_id','province_id','direction_id','location_id','story_id','name'],
        attributes: [['name', 'big'], ['name', 'medium'], ['name', 'small'], 'id', ['description_' + lang, 'description'], 'cover', 'fav'],
        where: {story_id: data.story_id}
    }));

    res.json(result);
};


/**
 * Manages images adding process
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.add = (req, res) => {

    let data;
    // Story adding with images case
    if ('storyAdding' in req) {
        data = req;
        this.handleAdding(data, res)
    }

    // Images adding
    else {
        data = req.body;

        uploadStoryImgs(req, res, async (err) => {

            if (!hasValidationErrors(req, res, err)) {
                this.handleAdding(data, res)
            }

            // If a file validation is not passed, removing other files in the current queue
            else {
                handleExistingFiles(data);

            }

        })
    }


};

/**
 * Handles images adding to db (also from save-story action)
 * @param data
 * @param res
 * @returns {Promise<void>}
 */
exports.handleAdding = async (data, res) => {

    // Getting story and its parent items by its id
    let storyRes = await Stories.findOne({
        where: {id: data.story_id},
        include: {
            model: Locations, attributes: ['id','name_en'], include: {
                model: Directions, attributes: ['id','name_en'], include: {
                    model: Provinces, attributes: ['id','name_en'], include: {
                        model: Countries, attributes: ['id','name_en']
                    }
                }
            }
        }
    });


    // Grabbing parents ids from the selected story
    let story = storyRes.toJSON();
    data.location_id = story.location.id;
    data.direction_id = story.location.direction.id;
    data.province_id = story.location.direction.province.id;
    data.country_id = story.location.direction.province.country.id;
    data.cover = 0;
    data.fav = 0;
    data.folder = folderUrl(story);

    console.log(data)

    if (!data.story_imgs) res.json("OK");

    // Checking if multiple images sent or just one
    if (data.story_imgs && data.story_imgs.constructor === Array) {

        // Creating record for each image of the story
        let list = data.story_imgs.map(async (img) => {
            data.name = img;
            await Images.create(data)
        });

        await Promise.all(list);
    }

    // One-image case
    else {
        data.name = data.story_imgs;
        await to(Images.create(data));
    }


    if (!res.headersSent) {

        res.json("OK");
    }
};

/**
 * Gets an image info by its id
 * @param req
 * @param res
 */
exports.getById = async (req, res) => {
    let data = req.query;
    let lang = data.lang;
    let result = await to(Images.findOne(
        {
            where: {id: data.id},
            attributes: ['id', 'name', `description_${lang}`, 'cover', 'fav', 'country_id', 'province_id', 'direction_id', 'location_id'],
            include: [
                {
                    model: Stories, include: [
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
                    ]
                }


            ],
        }
    ));

    let ret = prepareResult(result, req);
    res.json(ret);

    res.json(result);
};

/**
 * Update an image info
 * @param req
 * @param res
 */
exports.updateInfo = async (req, res) => {
    let data = req.body;
    let image_id = data.id;
    let translate = +data.translate;
    let coverItem = data['coverItem'];

    // Extracting update fields from the request data
    let {id, lang, ...fields} = data;

    // if translate flag is enabled, getting translated names of stories and appending to the request
    if (translate) {

        let descFields = await translateHelper(data['description_' + lang], lang, 'description');
        fields = {...data, ...descFields};

    }

    // If image is set as cover for an *item, updating the corresponding model cover property
    if (coverItem && data['cover']) {
        await db[coverItem['model']].update({cover_id: image_id}, {where: {id: coverItem['value']}})
    }


    let result = await  to(Images.update(fields, {where: {id: image_id}}), res);
    res.json(result)
};

/**
 * Removes an image from the selected story
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.remove = async (req, res) => {
    let data = req.query;

    if (data.withFile) {
        let imageFile = OTHER_UPLOADS_FOLDER + folderName(data['file']);

        let error = await to(removeFile(imageFile), res);
        if (error) res.status(500).json(error);
    }


    await to(Images.destroy({where: {id: data.id}}));
    this.get(req, res)
};