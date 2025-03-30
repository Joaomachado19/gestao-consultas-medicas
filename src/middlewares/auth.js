const jwt = require('jsonwebtoken');
require('dotenv').config();

const autenticar = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        return res.status(401).json({erro: 'Acesso não autorizado'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        res.status(401).json({erro: 'Token invalido'});
    }
};
module.exports = autenticar;