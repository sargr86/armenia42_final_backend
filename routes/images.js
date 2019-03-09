const imagesController = require('../controllers/imagesController');
const router = express.Router();
const validateProvinceData = require('../validators/validateProvinceData');

router.get('/get',imagesController.get);
router.post('/add',uploadStoryImgs,imagesController.add);
router.get('/get-by-id', imagesController.getById);
router.put('/update-info',uploadStoryImgs, imagesController.updateInfo);
router.delete('/remove', imagesController.remove);

module.exports = router;