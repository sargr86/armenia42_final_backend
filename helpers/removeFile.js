module.exports = async(file) => {
    if (fse.existsSync(file)) {
        await to(fse.remove(file))
    }
    else {
        return 'file_not_exist_error';
    }
};