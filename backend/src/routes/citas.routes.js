const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citas.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

// POST: Cualquier usuario logueado puede crear una cita
router.post('/', verificarToken, citasController.createCita);

// GET: Ver la agenda de una barbería
router.get('/:barberia_id', verificarToken, citasController.getCitasPorBarberia);

module.exports = router;