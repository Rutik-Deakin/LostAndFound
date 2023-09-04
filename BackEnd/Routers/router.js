const express = require('express');
const { testController, getAllSums } = require('../Controllers/controller');
const router = express.Router();


router.get('/', getAllSums);

router.get('/add', testController);

module.exports = router;