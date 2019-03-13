module.exports = async (data) => {
    let folderPath = await getUploadFolder(data);
    let storyImgs = data.story_imgs;

    if (storyImgs && storyImgs.constructor === Array) {

        // Getting all the files of current directory and filtering the current queue files
        let uploadedQueueImgs = fse.readdirSync(folderPath);
        let foundQueueFiles = uploadedQueueImgs.filter(value => storyImgs.includes(value));

        // Removing only current queue files
        foundQueueFiles.map(file => {
            let path = folderPath + '/' + file;
            if (fse.existsSync(path)) {
                fse.remove(path);

            }
        })

    }
};