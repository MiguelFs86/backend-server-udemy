var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

exports.verificaToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Invalid token',
                error: err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

exports.verificaADMIN_ROLE = function(req, res, next) {
    var usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Not allowed',
            error: { message: 'No es administrador' }
        });
    }
};

exports.verificaAdminMismoUsuario = function(req, res, next) {
    var usuario = req.usuario;
    var id = req.params.id;

    if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Not allowed',
            error: { message: 'No es administrador ni el mismo usuario' }
        });
    }
};