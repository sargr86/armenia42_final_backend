module.exports = (oldFolder, newFolder) => {
    oldFolder = oldFolder.replace(/\//g, "").toLowerCase();
    newFolder = newFolder.replace(/\//g, "").toLowerCase();
    return oldFolder !== newFolder;
}