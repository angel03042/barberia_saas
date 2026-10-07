const db = require('../config/database');

const createServicio = (req, res) => {
    const { barberia_id, nombre, descripcion, precio, duracion_minutos } = req.body;

    if (!barberia_id || !nombre || !precio || !duracion_minutos) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Regla Multi-tenant: Si es admin_barberia, validar que el ID coincida con su token
    if (req.user.rol === 'admin_barberia' && req.user.barberia_id !== barberia_id) {
        return res.status(403).json({ error: 'No puedes crear servicios para otra sucursal' });
    }

    const sql = `INSERT INTO servicios (barberia_id, nombre, descripcion, precio, duracion_minutos) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(sql, [barberia_id, nombre, descripcion || '', precio, duracion_minutos], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Servicio creado exitosamente', 
            servicio_id: this.lastID 
        });
    });
};

const getServicios = (req, res) => {
    const { barberia_id } = req.params;
    
    // Obtenemos solo los servicios activos de una barbería específica
    const sql = `SELECT * FROM servicios WHERE barberia_id = ? AND activo = 1`;
    
    db.all(sql, [barberia_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
};

module.exports = {
    createServicio,
    getServicios
};