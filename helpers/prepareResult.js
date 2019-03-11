let path = require('path');
module.exports = (dt, req) => {

    if (dt) {

        // Appends the necessary missing items
        dt = dt.get({plain: true});
        dt['folder'] = folderUrl(dt);
        dt['parent_name'] = dt['name_en'];

        // If the data has images key, appending full paths of images and separating the cover image for the current *item
        const images = dt['images'];
        if (images && images.length > 0) {
            images.map(img => {

                // Searching the current file by name and appending full path on the end to it
                let search = searchFileRecursive(OTHER_UPLOADS_FOLDER + dt['folder'], img['name'])[0];
                search = ('http://' + req.headers.host + '/' + path.relative('./', search).replace(/\\/g, '/')).replace('public', ''); //
                // img['name'] = search;

                // Preparation for ngx-gallery in frontend
                img['big'] = img['small'] = img['medium'] = search;

console.log(img['id'])
                // Separating cover image
                if (dt['cover_id'] === img['id']) {
                    dt['cover'] = search;
                }
                // delete img['id'];
                delete img['name'];

            })
        }
        return dt;
    }

};