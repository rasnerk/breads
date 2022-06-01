const router = require('express').Router();
const bakersController = require('../controllers/bakers_controller')

router.get('/data/seed', bakersController.seedBakerData )

module.exports = router;