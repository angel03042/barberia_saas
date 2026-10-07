const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

// Conectarse a la base de datos usando la ruta del .env
const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
    if (err) {
        console.error('❌ Error al conectar con SQLite:', err.message);
    } else {
        console.log('✅ Conexión exitosa a la base de datos SQLite.');
        // Habilitar el soporte de llaves foráneas
        db.run('PRAGMA foreign_keys = ON;'); 
    }
});

module.exports = db;