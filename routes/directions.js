const directionsController = require('../controllers/directionsController');
const router = express.Router();
const validateProvinceData = require('../validators/validateProvinceData');

router.get('/get',directionsController.get);
router.post('/add',uploadFlag,validateProvinceData.rules,directionsController.add);
router.get('/get-by-name', directionsController.getByName);
router.put('/update',uploadFlag,validateProvinceData.rules, directionsController.update);
router.delete('/remove', directionsController.remove);

module.exports = router;