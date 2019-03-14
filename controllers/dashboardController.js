/**
 * Gets main items (countries,province,etc.) statistics
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getItemsStatistics = async (req, res) => {
    let ret = [];

    let results = DEFAULT_APP_ITEMS.map(async(item)=>{
        let itemCount = await to(db[item].count({distinct: true, col: 'id'}), res);
        ret.push({
            name:item,
            count: itemCount
        })

    })

    await Promise.all(results)

    // ret['countries'] = await to(Countries.count({distinct: true, col: 'id'}), res);
    // ret['provinces'] = await to(Provinces.count({distinct: true, col: 'id'}), res);
    // ret['directions'] = await to(Directions.count({distinct: true, col: 'id'}), res);
    // ret['locations'] = await to(Locations.count({distinct: true, col: 'id'}), res);
    // ret['stories'] = await to(Stories.count({distinct: true, col: 'id'}), res);
    // ret['images'] = await to(Images.count({distinct: true, col: 'id'}), res);

    res.json(ret);
};