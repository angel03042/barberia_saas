const express = require('express');
const cors = require('cors');
const barberiasRoutes = require('./routes/barberias.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
    res.json({ message: 'Sistema inicializado correctamente. Status: OK' });
});

app.use('/api/barberias', barberiasRoutes);

module.exports = app;