const storiesController = require('../controllers/storiesController');
const router = express.Router();
const validateProvinceData = require('../validators/validateProvinceData');

router.get('/get',storiesController.get);
router.get('/get-images',storiesController.getImages);
router.get('/get-by-id', storiesController.getById);
router.post('/add',uploadStoryImgs,storiesController.add);
router.put('/update',uploadStoryImgs, storiesController.update);
router.delete('/remove', storiesController.remove);

module.exports = router;