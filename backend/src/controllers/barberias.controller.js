const db = require('../config/database');

const createBarberia = (req, res) => {
    const { nombre, direccion, telefono } = req.body;
    
    if (!nombre || !direccion) {
        return res.status(400).json({ error: 'Los campos nombre y direccion son obligatorios' });
    }

    const sql = `INSERT INTO barberias (nombre, direccion, telefono) VALUES (?, ?, ?)`;
    
    db.run(sql, [nombre, direccion, telefono], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Barberia registrada con exito', 
            barberia_id: this.lastID 
        });
    });
};

const getBarberias = (req, res) => {
    const sql = `SELECT * FROM barberias`;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
};

module.exports = {
    createBarberia,
    getBarberias
};