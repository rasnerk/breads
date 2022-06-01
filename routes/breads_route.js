const router = require('express').Router();
const breadsController = require('../controllers/breads_controller');

router.get('/', breadsController.fetchAllBreads )
router.get('/new', breadsController.renderNewPage )
router.get('/:breadId/edit', breadsController.renderEditPage )
router.get('/:breadId', breadsController.renderSingleBread )
router.post('/', breadsController.createNewBread )
router.delete('/:breadId', breadsController.deleteBread )
router.put('/:breadId', breadsController.editBread )
router.get('/data/seed', breadsController.seedBreadData )

module.exports = router;