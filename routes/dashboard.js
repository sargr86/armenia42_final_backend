const dashboardController = require('../controllers/dashboardController');
const router = express.Router();

router.get('/get-item-statistics',dashboardController.getItemsStatistics);
router.get('/get-manage-images',dashboardController.getManageImgs);
router.get('/get-user-images',dashboardController.getManageImgs);

module.exports = router;