const provincesController = require('../controllers/provincesController');
const router = express.Router();
const validateCountryData = require('../validators/validateCountryData');

router.get('/get',provincesController.get);
router.post('/add',uploadCountryFlag,validateCountryData.rules,provincesController.add);
router.get('/get-by-name', provincesController.getProvinceByName);
router.put('/update',uploadCountryFlag,validateCountryData.rules, provincesController.update);
router.delete('/remove', provincesController.remove);

module.exports = router;