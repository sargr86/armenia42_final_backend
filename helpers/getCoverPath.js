let fs = require('fs');
let path = require('path');
module.exports = (req, dt) => {
    if (dt['images'] && dt['images'].length > 0) {
        let result = searchFileRecursive(OTHER_UPLOADS_FOLDER + dt['folder'], dt['images'][0]['name'])[0];
        result =  path.relative('./', result); //
        dt['cover'] = result.replace(/\\/g, '/');

    }
    return dt;
};