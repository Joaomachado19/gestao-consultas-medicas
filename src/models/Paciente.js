const Database = require('../database/Database');
const { ValidationError, DatabaseError } = require('../errors');

class Paciente {
    static async criar(paciente) {
        try {
            const requiredFields = ['nome', 'data_nascimento', 'cpf'];
            const missingFields = requiredFields.filter(field => !paciente[field]);

            if (missingFields.length > 0) {
                throw new ValidationError(`Campos obrigatórios: ${missingFields.join(', ')}`);
            }

            const [result] = await Database.query(
                `INSERT INTO pacientes
                (nome, data_nascimento, cpf, telefone, email, historico, convenio)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    paciente.nome,
                    paciente.data_nascimento,
                    paciente.cpf,
                    paciente.telefone,
                    paciente.email,
                    paciente.historico,
                    paciente.convenio
                ]
            );
            return result.insertId;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new DatabaseError('CPF já cadastrado');
            }
            throw error;
        }
    }

    // Outros métodos (listar, buscarPorId, atualizar, excluir)...
}

module.exports = Paciente;