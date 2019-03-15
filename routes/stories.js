const storiesController = require('../controllers/storiesController');
const router = express.Router();
const validateStoryData = require('../validators/validateStoryData');

router.get('/get',storiesController.get);
router.get('/get-images',storiesController.getImages);
router.get('/get-by-id', storiesController.getById);
router.post('/add',uploadStoryImgs,validateStoryData.rules,storiesController.add);
router.put('/update',uploadStoryImgs, validateStoryData.rules,storiesController.update);
router.delete('/remove', storiesController.remove);

module.exports = router;