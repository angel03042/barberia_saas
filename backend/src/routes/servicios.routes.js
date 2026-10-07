const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/servicios.controller');
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware');

// POST: Protegido. Solo administradores pueden agregar catálogo
router.post(
    '/', 
    verificarToken, 
    verificarRol(['super_admin', 'admin_barberia']), 
    serviciosController.createServicio
);

// GET: Público. Usamos :barberia_id como parámetro en la URL
router.get('/:barberia_id', serviciosController.getServicios);

module.exports = router;