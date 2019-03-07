const directionsController = require('../controllers/directionsController');
const router = express.Router();
const validateDirectionData = require('../validators/validateDirectionData');

router.get('/get',directionsController.get);
router.post('/add',uploadFlag,validateDirectionData.rules,directionsController.add);
router.get('/get-by-name', directionsController.getByName);
router.put('/update',uploadFlag,validateDirectionData.rules, directionsController.update);
router.delete('/remove', directionsController.remove);

module.exports = router;