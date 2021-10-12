const express = require('express');
const listRoutes = require('./listRoutes');
const productsRoutes = require('./productsRoutes');
const config = require('../config/config');

const router = express.Router();

router.use('/list', listRoutes);
router.use('/products', productsRoutes);

module.exports = router;
