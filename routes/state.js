const express = require('express');
const router = express.Router();
const stateController = require('../app/api/controllers/state');

router.post('/',stateController.create);
router.get('/', stateController.getAll);
router.get('/getstates', stateController.getstates);

module.exports = router;