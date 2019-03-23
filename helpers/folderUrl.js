let result = [];
let folderArr = [];
let folderUrl = '';
let allowedKeys = ['story','location','direction','province','country']
module.exports = (data, lang = 'en', reverse = true, file = true) => {
    build(data, '', reverse);
    // Returns only unique results array
    // return result.filter((t = {}, e => !(t[e] = e in t)));
    return folderName(folderUrl,true);
};

/**
 * Building folder path here
 * @param data
 * @param key
 * @param reverse
 */
function build(data, key = '', reverse) {

    // If key is passed, getting the next value
    if (key) data = data[key];

    // Getting keys of passed data
    let keys = Object.keys(data).filter(k => {
        // Filtering keys that don't have 'name' string in their name
        if (allowedKeys.indexOf(k)!==-1) {
            return true;
        }
        // Getting file name here
        else if (k === 'name') {
            folderArr.push(data[k])
        }
    });

    // console.log(data)

    // Saving the value of current recursion!!!
    if (data['name_en']) {
        // console.log(data['name_en'])
        folderArr.push(data['name_en'].replace(/ /g, '_'))
    }

    // Checks to see if counter reached at the keys array end, if not start over
    if (keys.length > 0 && keys[0]!=0) {
        build(data, keys[0], reverse);
    }
    else {
        if (reverse) folderArr = folderArr.reverse();

        folderUrl = folderArr.join('/');
        folderArr = [];
        result.push(folderUrl);
    }

}