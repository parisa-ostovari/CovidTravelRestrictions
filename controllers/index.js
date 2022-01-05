const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashbardRoutes = require('./dashboard-routes.js')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/dashbard', dashbardRoutes);

module.exports = router;
