const express = require('express');
const router = express.Router();
const barberiasController = require('../controllers/barberias.controller');

router.post('/', barberiasController.createBarberia);
router.get('/', barberiasController.getBarberias);

module.exports = router;