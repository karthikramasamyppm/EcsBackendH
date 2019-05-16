const express = require('express');
const router = express.Router();
const cityController = require('../app/api/controllers/city');

router.post('/',cityController.create);
router.get('/', cityController.getAll);
router.get('/getcities', cityController.getcities);



module.exports = router;