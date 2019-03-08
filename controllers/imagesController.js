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
 * Handles images adding to db (also from save-story action)
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.add = async (req, res) => {

    let data;
    if ('storyAdding' in req) {
        data = req;
    }
    else data = req.body;

    // Getting story and its parent items by its id
    let storyRes = await Stories.findOne({
        where: {id: data.story_id},
        include: {
            model: Locations, attributes: ['id'], include: {
                model: Directions, attributes: ['id'], include: {
                    model: Provinces, attributes: ['id'], include: {
                        model: Countries, attributes: ['id']
                    }
                }
            }
        }
    });


    // Grabbing ids from the selected story
    let story = storyRes.toJSON();
    data.location_id = story.location.id;
    data.direction_id = story.location.direction.id;
    data.province_id = story.location.direction.province.id;
    data.country_id = story.location.direction.province.country.id;
    data.cover = 0;
    data.fav = 0;

    if (!data.story_imgs) res.json("OK");

    // Checking if multiple images sent or just one
    if (data.story_imgs && data.story_imgs.constructor === Array) {
        // Creating record for each image of the story
        let list = data.story_imgs.map(async (img) => {
            data.name = img;
            await Images.create(data)
        });

        const results = await Promise.all(list);
    }

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
            attributes: ['id', 'name', `description_${lang}`, 'cover', 'fav'],
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


    if (result) {
        result = result.get({plain: true});
        result['folder'] = folderUrl(result);
        result['parent_name'] = result['name_en'];
    }

    res.json(result);
};

/**
 * Update an image info
 * @param req
 * @param res
 */
exports.updateInfo = async (req, res) => {
    let data = req.body;

    let {id, lang, ...fields} = data;
    let result = await  to(Images.update(fields, {where: {id: data.id}}), res);
    res.json(result)
};