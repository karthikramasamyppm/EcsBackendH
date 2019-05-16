const express = require('express');
const router = express.Router();
const cityController = require('../app/api/controllers/city');

router.post('/',cityController.create);
router.get('/', cityController.getAll);


module.exports = router;