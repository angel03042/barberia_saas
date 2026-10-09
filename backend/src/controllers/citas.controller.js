const db = require('../config/database');

const createCita = (req, res) => {
    try {
        const { barberia_id, cliente_id, barbero_id, servicio_id, fecha_hora, notas, cliente, telefono } = req.body;

        let idDelCliente = 1; 
        if (req.user && req.user.id) {
            idDelCliente = req.user.id;
        } else if (cliente_id && !isNaN(cliente_id)) {
            idDelCliente = cliente_id;
        }

        const idDelBarbero = (barbero_id && !isNaN(barbero_id)) ? barbero_id : 1;
        const idDeLaBarberia = barberia_id || 1;

        // Guardamos el nombre de manera clara para poder extraerlo después
        // Si el cliente escribió su nombre, lo anteponemos con una etiqueta única
        const nombreParaGuardar = cliente ? cliente.trim() : 'Cliente Anónimo';
        const telefonoParaGuardar = telefono ? telefono.trim() : 'S/N';
        
        const notasConDatosCliente = `Cliente: ${nombreParaGuardar} - Tel: ${telefonoParaGuardar} | ${notas || ''}`;

        if (!servicio_id || !fecha_hora) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const sql = `INSERT INTO citas (barberia_id, cliente_id, barbero_id, servicio_id, fecha_hora, notas) VALUES (?, ?, ?, ?, ?, ?)`;
        
        db.run(sql, [idDeLaBarberia, idDelCliente, idDelBarbero, servicio_id, fecha_hora, notasConDatosCliente], function(err) {
            if (err) {
                console.error("Error SQL al insertar cita:", err.message);
                return res.status(500).json({ error: 'Error BD: ' + err.message });
            }
            res.status(201).json({ 
                message: 'Cita reservada exitosamente', 
                cita_id: this.lastID 
            });
        });
    } catch (error) {
        console.error("Error crítico en createCita:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getCitasPorBarberia = (req, res) => {
    const { barberia_id } = req.params;
    
    const sql = `
        SELECT citas.*, 
               COALESCE(servicios.nombre, 'Corte General') as servicio, 
               COALESCE(servicios.precio, 0) as precio,
               COALESCE(barberos.nombre, 'Barbero Asignado') as barbero
        FROM citas
        LEFT JOIN servicios ON citas.servicio_id = servicios.id
        LEFT JOIN usuarios as barberos ON citas.barbero_id = barberos.id
        WHERE citas.barberia_id = ?
    `;

    db.all(sql, [barberia_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const citasFormateadas = rows.map(cita => {
            let nombreCliente = "Cliente Mostrador";
            
            if (cita.notas && cita.notas.includes("Cliente:")) {
                try {
                    // Extrae el texto entre "Cliente: " y " - Tel:"
                    const inicio = cita.notas.indexOf("Cliente:") + 8;
                    const fin = cita.notas.indexOf(" - Tel:");
                    if (inicio > 7 && fin > inicio) {
                        nombreCliente = cita.notas.substring(inicio, fin).trim();
                    }
                } catch (e) {
                    nombreCliente = "Cliente Web";
                }
            }

            return {
                ...cita,
                cliente_nombre: nombreCliente
            };
        });

        res.json(citasFormateadas);
    });
};

module.exports = {
    createCita,
    getCitasPorBarberia
};