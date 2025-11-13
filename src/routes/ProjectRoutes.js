const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authenticateToken  = require('../middleware/auth');

router.get('/projeto', authenticateToken, async (req, res) => {
  try {
    const projetos = await Project.find(); // Busca os processos
    res.json(projetos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar projetos', details: error.message });
  }
});

module.exports = router;
