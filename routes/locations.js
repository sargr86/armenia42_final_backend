const locationsController = require('../controllers/locationsController');
const router = express.Router();
const validateLocationData = require('../validators/validateLocationData');

router.get('/get',locationsController.get);
router.post('/add',uploadFlag,validateLocationData.rules,locationsController.add);
router.get('/get-by-name', locationsController.getByName);
router.put('/update',uploadFlag,validateLocationData.rules, locationsController.update);
router.delete('/remove', locationsController.remove);

module.exports = router;