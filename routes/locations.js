const locationsController = require('../controllers/locationsController');
const router = express.Router();
const validateProvinceData = require('../validators/validateProvinceData');

router.get('/get',locationsController.get);
router.post('/add',uploadFlag,locationsController.add);
router.get('/get-by-name', locationsController.getByName);
router.put('/update',uploadFlag, locationsController.update);
router.delete('/remove', locationsController.remove);

module.exports = router;