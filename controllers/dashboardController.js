/**
 * Gets main items (countries,province,etc.) statistics
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getItemsStatistics = async (req, res) => {
    let ret = [];

    let results = DEFAULT_APP_ITEMS.map(async (item) => {
        let itemCount = await to(db[item].count({distinct: true, col: 'id'}), res);
        ret.push({
            name: item,
            count: itemCount
        })

    });

    await Promise.all(results);

    res.json(ret);
};

/**
 * Gets images for managing
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getManageImgs = async (req, res) => {
    let data = req.query;
    let lang = data.lang;

    let where = [];
    let whereUser = {};
    if (data.cat_id) {
        where.push({where: sequelize.where(sequelize.col('location->loc_categories->loc_cats.category_id'), data.cat_id)});
    }

    // For showing one user images
    if (data.user_id) {
        whereUser = {id: data.user_id}
    }


    let result = await to(Images.findAll({
        attributes: ['id', 'name'],
        include: [
            {
                model: Users, attributes: [fullName(`first_name_${lang}`, `last_name_${lang}`)],
                where: whereUser
            },
            {
                model: Stories, attributes: ['id', `name_${lang}`]
            },
            {
                model: Locations, attributes: ['id', `name_${lang}`], include: [
                    {
                        model: Categories, attributes: ['id']
                    }
                ]
            },
            {
                model: ReviewStatuses, attributes: [`name_${lang}`]
            }
        ],
        where
    }), res);


    let ret = [];
    if (result) {
        result.map(img => {
            img = img.toJSON();

            // Searching the current file by name and appending full path on the end to it
            let search = searchFileRecursive(OTHER_UPLOADS_FOLDER, img['name'])[0];

            if (search) {
                search = (path.relative('./', search).replace(/\\/g, '/')).replace('public', '');

                // Saving image full path
                img['img_path'] = search;
                let imageUrl = folderName(search.replace('uploads/others/', ''), true);
                imageUrl = imageUrl.substring(0, imageUrl.lastIndexOf('/'));
                imageUrl = imageUrl.substring(0, imageUrl.lastIndexOf('/')) + '/' + img.story.id + '/image/' + img.id;
                img['url'] = imageUrl;

                // Separating cover image
                if (result['cover_id'] === img['id']) {
                    result['cover'] = search;
                }
                // delete img['id'];
                ret.push(img)

            }

        });
    }


    if (!res.headersSent) {

        res.json(ret);
    }


};