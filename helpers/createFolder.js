module.exports = async(data)=>{
    const lang = data.lang;
    let names = await translateHelper(data['name_' + lang], lang, 'name');


    // Creating the country folder if not exist (maybe creating during multer validation checks by me)
    fse.ensureDir(`${OTHER_UPLOADS_FOLDER}${data['folder']}/${folderName(names['name_en'])}`);

    return names;
};