const jwt = require('jsonwebtoken');
require('dotenv').config();

const autenticar = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
}