const jwt = require('jsonwebtoken');

// Verifica que el usuario tenga un token válido
const verificarToken = (req, res, next) => {
    // El token suele enviarse en el header Authorization como "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Se requiere un token.' });
    }

    try {
        // Decodificar el token usando la misma clave secreta
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        
        // Guardar los datos del usuario en la petición para que el controlador los pueda usar
        req.user = decodificado;
        next(); // Permitir que la petición continúe hacia el controlador
    } catch (error) {
        return res.status(403).json({ error: 'Token invalido o expirado.' });
    }
};

// Verifica que el usuario tenga uno de los roles permitidos
const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({ error: 'Error interno: No se verifico el token antes del rol' });
        }

        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ error: 'No tienes los permisos necesarios para realizar esta accion' });
        }

        next();
    };
};

module.exports = {
    verificarToken,
    verificarRol
};