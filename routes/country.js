const express = require('express');
const router = express.Router();
const countryController = require('../app/api/controllers/country');

router.post('/',countryController.create);
router.get('/', countryController.getAll);
router.get('/getcountry', countryController.getCountry);
router.post('/:countryId', countryController.updateById);
router.delete('/:countryId', countryController.deleteById);


module.exports = router;