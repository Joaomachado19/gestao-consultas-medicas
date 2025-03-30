const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const autenticar = require('../middlewares/auth');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de boas-vindas
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas
 */
router.get('/', (req, res) => {
  res.json({ mensagem: 'API de Gestão de Consultas Médicas' });
});

// Rotas públicas
router.use('/auth', authRoutes);

// Rotas protegidas (exemplo)
router.get('/protegida', autenticar, (req, res) => {
  res.json({ mensagem: `Acesso concedido para ${req.usuario.tipo}` });
});

module.exports = router;
