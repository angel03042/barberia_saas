require('dotenv').config();
const app = require('./src/app.js');
const db = require('./src/config/database.js'); // Lo importamos para que se ejecute la conexión a la DB

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});