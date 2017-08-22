var express = require('express')
var router = express.Router();

var genController = require('../controllers/genController')

router.get('/book',genController.getAll);
router.post('/book',genController.saveBook);
router.put('/book/:id',genController.updateBook);
router.delete('/book/:id',genController.deleteBook);

module.exports = router;