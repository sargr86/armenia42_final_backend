const provincesController = require('../controllers/provincesController');
const router = express.Router();
const validateProvinceData = require('../validators/validateProvinceData');

router.get('/get',provincesController.get);
router.post('/add',uploadFlag,validateProvinceData.rules,provincesController.add);
router.get('/get-by-name', provincesController.getProvinceByName);
router.put('/update',uploadFlag,validateProvinceData.rules, provincesController.update);
router.delete('/remove', provincesController.remove);

module.exports = router;