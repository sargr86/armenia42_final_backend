const imagesController = require('../controllers/imagesController');
const router = express.Router();
const validateProvinceData = require('../validators/validateProvinceData');
const multiparty = require('multiparty');

router.use(function (req, res, next) {

    next()
});

// const checkFiles = async (req, res, next) => {
//     let form = new multiparty.Form();
//     form.parse(req, function (err, fields, files) {
//         let existingFiles = [];
//         fields.story_imgs.map(name => {
//             // Checking if file exists
//             let filesWithThisName = searchFileRecursive(OTHER_UPLOADS_FOLDER, name);
//
//             if (filesWithThisName.length !== 0) {
//                 existingFiles.push(name)
//             }
//
//         });
//
//         if (existingFiles.length > 0) {
//             res.status(500).json({msg: 'file_exists_error', name: existingFiles.join(',')});
//
//         }
//        else  next();
//
//     })
// };

router.get('/get',imagesController.get);
router.post('/add',uploadStoryImgs,imagesController.add);
router.get('/get-by-id', imagesController.getById);
router.put('/update-info',uploadStoryImgs, imagesController.updateInfo);
router.delete('/remove', imagesController.remove);

module.exports = router;