const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST: Registrar un usuario
const registerUsuario = async (req, res) => {
    const { barberia_id, nombre, email, password, rol, telefono } = req.body;

    if (!nombre || !rol) {
        return res.status(400).json({ error: 'El nombre y el rol son obligatorios' });
    }

    try {
        let passwordHash = null;
        
        // Solo encriptamos si enviaron contraseña (recordando a los clientes de mostrador)
        if (password) {
            const saltRounds = 10;
            passwordHash = await bcrypt.hash(password, saltRounds);
        }

        const sql = `INSERT INTO usuarios (barberia_id, nombre, email, password_hash, rol, telefono) VALUES (?, ?, ?, ?, ?, ?)`;
        
        db.run(sql, [barberia_id || null, nombre, email || null, passwordHash, rol, telefono || null], function(err) {
            if (err) {
                // Código 19 en SQLite significa violación de restricción UNIQUE (email duplicado)
                if (err.errno === 19) {
                    return res.status(400).json({ error: 'El email ya esta registrado' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ 
                message: 'Usuario registrado con exito', 
                usuario_id: this.lastID 
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// POST: Iniciar sesión
const loginUsuario = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const sql = `SELECT * FROM usuarios WHERE email = ?`;

    db.get(sql, [email], async (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar contraseña
        const match = await bcrypt.compare(password, usuario.password_hash);
        if (!match) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Generar Token JWT
        const payload = {
            id: usuario.id,
            barberia_id: usuario.barberia_id,
            rol: usuario.rol
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

        res.status(200).json({
            message: 'Autenticacion exitosa',
            token: token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol,
                barberia_id: usuario.barberia_id
            }
        });
    });
};

module.exports = {
    registerUsuario,
    loginUsuario
};