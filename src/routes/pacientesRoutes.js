const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
const autenticar = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gestão de pacientes
 */

/**
 * @swagger
 * /pacientes:
 *   post:
 *     tags: [Pacientes]
 *     summary: Cria um novo paciente
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - data_nascimento
 *               - cpf
 *             properties:
 *               nome:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               cpf:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               historico:
 *                 type: string
 *               convenio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', autenticar, async (req, res) => {
    try {
        const id = await Paciente.criar(req.body);
        res.status(201).json({ id });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            erro: error.message || 'Erro interno'
        });
    }
});

/**
 * @swagger
 * /pacientes:
 *   get:
 *     tags: [Pacientes]
 *     summary: Lista todos os pacientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 */
router.get('/', autenticar, async (req, res) => {
    try {
        const pacientes = await Paciente.listar();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar pacientes' });
    }
});

// Implementar outras rotas (GET por ID, PUT, DELETE) seguindo o mesmo padrão

module.exports = router;