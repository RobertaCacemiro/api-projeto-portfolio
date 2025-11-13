const express = require('express');
const router = express.Router();
// Importa o middleware de autenticação (verifica o JWT)
const authMiddleware = require('../middleware/auth'); 
// Importa o controlador de lógica do usuário
const userController = require('../controllers/user');

// 1. Rota Protegida: Requer o middleware 'authMiddleware.verifyToken'
// para garantir que o usuário está logado com um token válido.
router.get('/profile', authMiddleware.verifyToken, userController.getProfile);

// 2. Outra Rota Protegida
router.put('/update', authMiddleware.verifyToken, userController.updateUser);

module.exports = router;