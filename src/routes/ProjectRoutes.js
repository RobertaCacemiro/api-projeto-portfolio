const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authenticateToken  = require('../middleware/auth');

// Cadastra novo projeto
router.post('/projeto', authenticateToken, async (req, res) => {
  try {
    const body = req.body;

    if (Array.isArray(body)) {
      const newProjects = await Project.insertMany(body);
      return res.status(201).json({
        message: "Projetos criados com sucesso!",
        count: newProjects.length,
        data: newProjects
      });
    }

    const newProject = new Project(body);
    await newProject.save();

    res.status(201).json({
      message: "Projeto criado com sucesso!",
      data: newProject
    });

  } catch (error) {

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => {

        switch (err.path) {
          case "title":
            return "O título é obrigatório.";
          case "description":
            return "A descrição é obrigatória.";
          case "repository_url":
            return "O diretório do repositório é obrigatório.";
          default:
            return err.message;
        }
      });

      return res.status(400).json({
        error: "Erro de validação",
        details: messages
      });
    }

    res.status(500).json({
      error: "Erro ao criar projeto",
      details: error.message
    });
  }
});

// Lista projetos
router.get('/projeto', authenticateToken, async (req, res) => {
  try {

    // Variaveis para paginação
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 5; 

    // cálculo do skip (quantos pular)
    const skip = (page - 1) * limit;

    // conta a qauntidade de registros no banco
    const total = await Project.countDocuments();

   // busca paginada
    const projects = await Project.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // ordena do mais novo pro mais antigo

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: projects
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar projetos', details: error.message });
  }
});

// Atualiza projeto
router.put('/projeto/:id', authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;

    const findProject = await Project.findByIdAndUpdate(
      id,
      req.body,       // dados enviados no body
      { new: true }   // retorna o projeto atualizado
    );

    if (!findProject) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    res.json({
      message: "Projeto atualizado com sucesso!",
      data: findProject
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar projeto', details: error.message });
  }
});

// Exclui registro
router.delete('/projeto/:id', authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;

    const deleteProject = await Project.findByIdAndDelete(id);

    if (!deleteProject) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    res.json({
      message: "Projeto deletado com sucesso!",
      data: deleteProject
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar projeto', details: error.message });
  }
});

module.exports = router;
