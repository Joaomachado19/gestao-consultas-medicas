const bcrypt = require('bcrypt');
const Database = require('../database/Database');

class Usuario {
    static async criar(nome, email, senha, tipo) {
        const hashedSenha = await bcrypt.hash(senha, 10);
        const result = await Database.query(
            'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
            [nome, email, hashedSenha, tipo]
        );
        return result.insertId;
    }
    static async buscarPorEmail(email) {
        const [rows] = await Database.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );
        return rows[0];
    }
    static async verificarSenha(senha, hash) {
        return await bcrypt.compare(senha, hash);
    }
}
module.exports = Usuario;