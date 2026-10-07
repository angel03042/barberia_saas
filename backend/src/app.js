const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON en el req.body

// Ruta de prueba básica
app.get('/api/ping', (req, res) => {
    res.json({ mensaje: '¡El backend de la barbería está vivo! 💈' });
});

module.exports = app;