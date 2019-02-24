module.exports = (folder)=>{

    console.log(folder)

    let errors = [];
    // Checking if folder exists
    fse.ensureDir(folder, err => {
        if (err) return 'directory_not_exist_error';
        else {
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


    })
}