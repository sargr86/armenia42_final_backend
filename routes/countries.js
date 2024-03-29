const countriesController = require('../controllers/countriesController');
const router = express.Router();
const validateCountryData = require('../validators/validateCountryData');

router.get('/get',countriesController.get);
router.post('/add',uploadCountryFlag,validateCountryData.rules,countriesController.add);
router.get('/get-by-name', countriesController.getCountryByName);
router.put('/update',uploadCountryFlag,validateCountryData.rules, countriesController.update);
router.delete('/remove', countriesController.remove);

module.exports = router;