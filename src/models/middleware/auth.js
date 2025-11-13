const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Seu modelo

async function login(req, res) {
    // 1. Recebe as credenciais customizadas do corpo da requisição
    const { userId, userSecret } = req.body;

    if (!userId || !userSecret) {
        return res.status(400).json({ 
            message: 'userId e userSecret são obrigatórios.' 
        });
    }

    try {
        // 2. Busca o usuário no MongoDB
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(401).json({ 
                message: 'Credenciais inválidas.' 
            });
        }

        // 3. Comparação Direta do userSecret
        // ATENÇÃO: Se userSecret for uma chave de API ou token de acesso,
        // esta comparação é válida. Se for uma senha, o ideal é usar bcrypt.
        if (userSecret !== user.userSecret) {
            return res.status(401).json({ 
                message: 'Credenciais inválidas.' 
            });
        }

        // 4. Geração do JSON Web Token (JWT)
        // O payload deve incluir dados para identificar o usuário, como o userId.
        const token = jwt.sign(
            { id: user.userId }, // Usamos o userId customizado como identificador no token
            process.env.JWT_SECRET, 
            { expiresIn: '3m' }      // Expira em 3 minutos
        );

        // 5. Sucesso
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
}

module.exports = login;