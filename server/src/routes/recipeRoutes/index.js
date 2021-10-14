const express = require('express');
const { fetchSeveralRecipies } = require('../../controllers/recipes');

const router = express.Router();

router.use('/random', fetchSeveralRecipies);

module.exports = router;
