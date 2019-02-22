const countriesController = require('../controllers/countriesController');
const router = express.Router();
const validateCountryData = require('../validators/validateCountryData');

router.get('/get',countriesController.get);
router.post('/add',uploadCountryFlag,validateCountryData.rules,countriesController.add);

module.exports = router;