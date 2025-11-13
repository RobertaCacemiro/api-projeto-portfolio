const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Importa o Modelo User do Mongoose

/**
 * Função para lidar com a requisição POST /api/auth/login.
 * Responsável por verificar as credenciais e gerar o JWT.
 */
exports.login = async (req, res) => {
    // 1. Recebe as credenciais customizadas do corpo da requisição
    const { userId, userSecret } = req.body;

    if (!userId || !userSecret) {
        return res.status(400).json({ 
            message: 'userId e userSecret são obrigatórios.' 
        });
    }

    try {
        // 2. Busca o usuário no MongoDB pelo userId
        const user = await User.findOne({ userId });

        if (!user) {
            // Não encontrou o usuário
            return res.status(401).json({ 
                message: 'Credenciais inválidas.' 
            });
        }

        // 3. Comparação Direta do userSecret (Seu método de autenticação)
        if (userSecret !== user.userSecret) {
            // userSecret não confere
            return res.status(401).json({ 
                message: 'Credenciais inválidas.' 
            });
        }

        // 4. Geração do JSON Web Token (JWT)
        // O payload deve conter o id customizado do usuário.
        const token = jwt.sign(
            { id: user.userId }, // Payload: O que será salvo dentro do token
            process.env.JWT_SECRET, // Chave Secreta do seu .env
            { expiresIn: '3m' }      // <-- DEFINE A EXPIRAÇÃO DE 3 MINUTOS
        );

        // 5. Sucesso: Retorna o token para o cliente
        return res.status(200).json({
            message: 'Autenticação bem-sucedida.',
            token: token,
            expiresIn: '3 minutos'
        });

    } catch (error) {
        console.error("Erro no processo de login:", error);
        return res.status(500).json({ 
            message: 'Erro interno do servidor.' 
        });
    }
};

// Se você tiver um endpoint para 'logout' ou 'refreshToken', eles também iriam aqui.
// exports.logout = async (req, res) => { ... };