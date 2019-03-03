/**
 * Gets images list of the selected story
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async(req,res) =>{
    let data = req.query;
    let lang = data.lang;
    let result = await to(Images.findAll({
        attributes:['id','country_id','province_id','direction_id','location_id','story_id','name'],
        where:{story_id:data.story_id}
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

    // Creating record for each image of the story
    data.story_imgs.map(async(img)=>{
        data.name = img;
        await Images.create(data)
    });

    res.json("OK");
};