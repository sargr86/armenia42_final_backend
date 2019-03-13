module.exports = async(data)=>{
    let lang = data.lang;
    let folderPath = OTHER_UPLOADS_FOLDER;


    // Getting the translations of a name fields passed in request
    if ('email' in data) {
        folderPath = USERS_UPLOAD_FOLDER
    }
    else {

        // Update case (handles also images adding to a story)
        if ('id' in data || 'story_id' in data) {
            // console.log(data)
            folderPath += data.folder;
        }
        // Insert case
        else {

            let names = await translateHelper(data['name_' + lang], lang, 'name');
            folderPath += folderName(data['folder'] + '/' + names['name_en'])
        }


    }

    return folderPath;
};