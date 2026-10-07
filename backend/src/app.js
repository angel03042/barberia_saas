const express = require('express');
const cors = require('cors');
const barberiasRoutes = require('./routes/barberias.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const serviciosRoutes = require('./routes/servicios.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
    res.json({ message: 'Sistema inicializado correctamente. Status: OK' });
});

app.use('/api/barberias', barberiasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/servicios', serviciosRoutes);

module.exports = app;