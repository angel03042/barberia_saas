const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.post('/register', usuariosController.registerUsuario);
router.post('/login', usuariosController.loginUsuario);

module.exports = router;