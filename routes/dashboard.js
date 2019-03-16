const dashboardController = require('../controllers/dashboardController');
const router = express.Router();

router.get('/get-item-statistics',dashboardController.getItemsStatistics);
router.get('/get-manage-images',dashboardController.getManageImgs);
router.get('/get-user-images',dashboardController.getManageImgs);
router.get('/get-review-status-filters',dashboardController.getReviewStatuses);
router.put('/change-review-status',dashboardController.changeReviewStatus);

module.exports = router;