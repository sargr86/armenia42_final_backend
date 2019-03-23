module.exports = async (req, itemCondition) => {
    let data = req.query;
    let ret = [];

    let imgAttributes = [

        'id', 'story_id',
        'name', 'year',
        ['description_' + data.lang,'description'],
        // [sequelize.fn('concat', sequelize.fn('COALESCE',sequelize.col('images.description_' + data.lang), ' (', sequelize.col('year'),')','')), 'description']
    ];

    let where = {};
    if (data.cat_id) {
        where = sequelize.where(sequelize.col('location->loc_categories->loc_cats.category_id'), data.cat_id);
    }

    // Getting image names list from db
    let result = await Images.findAll({
        attributes: imgAttributes,
        where: [itemCondition, where],
        include: [
            {
                model: Locations, attributes: ['id'], include: [
                    {
                        model: Categories, attributes: ['id']
                    },
                ]
            },
            {
                model:ReviewStatuses, where:{name_en:'accepted'},attributes:['name_en']
            }
        ],
    });


    result.map(img => {
        img = img.toJSON();

        // Searching the current file by name and appending full path on the end to it
        let search = searchFileRecursive(OTHER_UPLOADS_FOLDER, img['name'])[0];

        if (search) {
            search = ('http://' + req.headers.host + '/' + path.relative('./', search).replace(/\\/g, '/')).replace('public', '');

            // Preparation for ngx-gallery in frontend
            img['big'] = img['small'] = img['medium'] = search;

            // Separating cover image
            if (result['cover_id'] === img['id']) {
                result['cover'] = search;
            }
            // delete img['id'];
            delete img['name'];
            ret.push(img)

        }

    });

    return ret;

};