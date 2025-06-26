const express = require('express');
const { storeData, getData } = require('../controllers/dataController');
const router = express.Router();

router.post('/store', storeData);
router.get('/get/:id', getData);

module.exports = router;
