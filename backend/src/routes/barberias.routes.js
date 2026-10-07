const express = require('express');
const router = express.Router();
const barberiasController = require('../controllers/barberias.controller');
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware');

// POST: Solo un super_admin puede registrar nuevas barberías
router.post(
    '/', 
    verificarToken, 
    verificarRol(['super_admin']), 
    barberiasController.createBarberia
);

// GET: Cualquier usuario logueado en el sistema puede ver las barberías
router.get(
    '/', 
    verificarToken, 
    barberiasController.getBarberias
);

module.exports = router;