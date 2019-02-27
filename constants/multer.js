


// Multer stuff
global.multer = require('multer');
global.UPLOAD_MAX_FILE_SIZE = 1024*1024;

let storage = multer.diskStorage({
    destination: async (req, file, cb)=>{

        let data = req.body;
        let lang = data.lang;
        let folderPath = OTHER_UPLOADS_FOLDER;


        // Getting the translations of a name fields passed in request
        if('email' in data){
            folderPath = USERS_UPLOAD_FOLDER
        }
        else {

            // Update case
            if('id' in data){
                console.log(data)
                folderPath += data.folder;
            }

            // Insert case
            else {

                let names = await translateHelper(data['name_' + lang], lang, 'name');
                folderPath += folderName(data['folder']+'/'+names['name_en'])
            }


        }
        console.log(folderPath)
        fse.ensureDir(folderPath);
        cb(null, folderPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // already have got Date implemented in the name
    }
});


let upload = multer({
    storage: storage,
    limits:{fileSize:UPLOAD_MAX_FILE_SIZE},
    fileFilter: function (req, file, cb) {

        let filetypes = /jpeg|jpg/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());


        if (!mimetype && !extname) {
            req.fileTypeError = "invalid_file_type";
            return cb(null, false,req.fileTypeError)
        }
        cb(null, true);
    }
});
global.uploadProfileImg = upload.single('profile_img_file');
global.uploadFlag = upload.single('flag_file');

