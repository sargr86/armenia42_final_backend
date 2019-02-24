module.exports = async(oldFolder,newFolder) =>{



    if (fse.existsSync(oldFolder)) {
        await to(fse.copy(oldFolder,newFolder));
        removeFolder(oldFolder)
    }
    else {
        return 'directory_not_exist';
    }

    await to(fse.ensureDir(oldFolder));




}