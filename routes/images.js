const imagesController = require('../controllers/imagesController');
const router = express.Router();
const validateProvinceData = require('../validators/validateProvinceData');

router.get('/get',imagesController.get);
router.post('/add',uploadStoryImgs,imagesController.add);
// router.get('/get-by-name', imagesController.getByName);
// router.put('/update',uploadStoryImgs, imagesController.update);
// router.delete('/remove', imagesController.remove);

module.exports = router;