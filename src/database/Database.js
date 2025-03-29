const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
    // Implementação do padrão Singleton
    static instance;

    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        // Configuração via variáveis de ambiente
        this.config = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10
        };

        this.pool = mysql.createPool(this.config);
        Database.instance = this;
    }

    // Método para estabelecer conexão
    async connect() {
        try {
            this.connection = await this.pool.getConnection();
            console.log('Conexão com o banco de dados estabelecida');
            return this.connection;
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
            throw error;
        }
    }

    // Método para executar queries
    async query(sql, params = []) {
        try {
            const [rows] = await this.pool.query(sql, params);
            return rows;
        } catch (error) {
            console.error('Erro na execução da query:', error);
            throw error;
        }
    }

    // Método para fechar a conexão
    async close() {
        try {
            await this.pool.end();
            console.log('Conexão com o banco de dados fechada');
        } catch (error) {
            console.error('Erro ao fechar a conexão:', error);
            throw error;
        }
    }
}

// Exportar uma única instância Singleton
module.exports = new Database();
