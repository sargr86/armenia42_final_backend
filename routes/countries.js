const countriesController = require('../controllers/countriesController');
const router = express.Router();

router.get('/get',countriesController.get);

module.exports = router;