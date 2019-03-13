module.exports = async(req,itemCondition) => {
    let data = req.query;

    let imgAttributes = [

        'id', 'story_id',
        [sequelize.fn('concat', 'http://' + req.headers.host + '/uploads/others/', sequelize.col('folder'), '/', sequelize.col('name')), 'big'],
        [sequelize.fn('concat', 'http://' + req.headers.host + '/uploads/others/', sequelize.col('folder'), '/', sequelize.col('name')), 'medium'],
        [sequelize.fn('concat', 'http://' + req.headers.host + '/uploads/others/', sequelize.col('folder'), '/', sequelize.col('name')), 'small'],
        'name', 'folder', 'description_' + data.lang
    ];

    let where = {};
    if (data.cat_id) {

        where = sequelize.where(sequelize.col('location->loc_categories->loc_cats.category_id'), data.cat_id);
    }

console.log(itemCondition)
    // Getting image names list from db
    let result = await Images.findAll({
        attributes: imgAttributes,
        where: [itemCondition,where],
        include: [
            {
                model: Locations, attributes: ['id'], include: [
                    {
                        model: Categories, attributes: ['id']
                    }
                ]
            }],
        // where
    });

    return result;

};