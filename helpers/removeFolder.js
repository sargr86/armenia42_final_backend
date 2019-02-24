module.exports = (folder) => {

    // Checking if folder exists
    if (fse.existsSync(folder)) {
        // If it is, emptying, then removing it
        fse.emptyDir(folder, err => {
            if (err) return 'error_while_emptying_dir';
            else {
                fse.remove(folder, err => {
                    if (err) return 'error_while_removing_dir';

                })
            }


        })
    }
    else {
        return 'directory_not_exist_error'
    }

};