const categoriesController = require('../controllers/categoriesController');
const router = express.Router();
const validateProvinceData = require('../validators/validateProvinceData');

router.get('/get',categoriesController.get);
// router.post('/add',uploadFlag,storiesController.add);
// router.get('/get-by-name', storiesController.getByName);
// router.put('/update',uploadFlag, storiesController.update);
// router.delete('/remove', storiesController.remove);

module.exports = router;