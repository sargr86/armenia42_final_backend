// Multer stuff
global.multer = require('multer');
global.UPLOAD_MAX_FILE_SIZE = 1024 * 1024;

let queuedFiles = [];
let storage = multer.diskStorage({
    destination: async (req, file, cb) => {

        let folderPath = await getUploadFolder(req.body);
        cb(null, folderPath)


    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // already have got Date implemented in the name
    }
});


let upload = multer({
    storage: storage,
    limits: {fileSize: UPLOAD_MAX_FILE_SIZE},
    fileFilter: function (req, file, cb) {

        let filetypes = /jpeg|jpg/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());


        // Checking if file type is valid
        if (!mimetype && !extname) {
            req.fileTypeError = "invalid_file_type";
            return cb(null, false, req.fileTypeError)
        }
        cb(null, true);
    }
});
global.uploadProfileImg = upload.single('profile_img_file');
global.uploadFlag = upload.single('flag_file');
global.uploadStoryImgs = upload.array('story_img_files', STORY_UPLOADS_MAX_COUNT);

