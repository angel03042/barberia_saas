const db = require('../config/database');

const createCita = (req, res) => {
    const { barberia_id, cliente_id, barbero_id, servicio_id, fecha_hora, notas } = req.body;

    // Si el usuario logueado es un cliente, forzamos que el cliente_id sea su propio ID de token
    // Si es un admin registrando a alguien de mostrador, tomará el cliente_id que venga en el body
    const idDelCliente = req.user.rol === 'cliente' ? req.user.id : cliente_id;

    if (!barberia_id || !idDelCliente || !barbero_id || !servicio_id || !fecha_hora) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para agendar' });
    }

    const sql = `INSERT INTO citas (barberia_id, cliente_id, barbero_id, servicio_id, fecha_hora, notas) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [barberia_id, idDelCliente, barbero_id, servicio_id, fecha_hora, notas || null], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Cita reservada exitosamente', 
            cita_id: this.lastID 
        });
    });
};

const getCitasPorBarberia = (req, res) => {
    const { barberia_id } = req.params;
    
    // Usamos INNER JOIN para traer los textos reales en vez de solo los IDs
    const sql = `
        SELECT c.id, c.fecha_hora, c.estado, c.notas,
               u_cliente.nombre AS cliente, 
               u_barbero.nombre AS barbero, 
               s.nombre AS servicio, 
               s.precio
        FROM citas c
        JOIN usuarios u_cliente ON c.cliente_id = u_cliente.id
        JOIN usuarios u_barbero ON c.barbero_id = u_barbero.id
        JOIN servicios s ON c.servicio_id = s.id
        WHERE c.barberia_id = ?
        ORDER BY c.fecha_hora ASC
    `;
    
    db.all(sql, [barberia_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
};

module.exports = {
    createCita,
    getCitasPorBarberia
};