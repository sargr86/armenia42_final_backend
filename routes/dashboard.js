const dashboardController = require('../controllers/dashboardController');
const router = express.Router();

router.get('/get-item-statistics',dashboardController.getItemsStatistics);

module.exports = router;