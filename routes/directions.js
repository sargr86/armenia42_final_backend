const directionsController = require('../controllers/directionsController');
const router = express.Router();
const validateDirectionData = require('../validators/validateDirectionData');

router.get('/get',directionsController.get);
router.get('/get-by-name', directionsController.getByName);
router.get('/get-images',directionsController.getImages);
router.post('/add',uploadFlag,validateDirectionData.rules,directionsController.add);
router.put('/update',uploadFlag,validateDirectionData.rules, directionsController.update);
router.delete('/remove', directionsController.remove);

module.exports = router;