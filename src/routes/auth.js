const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login (/oauth/token)
router.post('/oauth/token', async (req, res) => {
  try {
    const { userId, userSecret } = req.body;

    const user = await User.findOne({ userId });
    if (!user) return res.status(401).json({ error: 'Id não encontrado' });

    const valid = userSecret === user.userSecret;
    if (!valid) return res.status(401).json({ error: 'Segredo incorreto' });

    const token = jwt.sign(
      { id: user._id, userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: '3m' }
    );

    res.json({
      access_token: token,
      token_type: 'Bearer',
      expires_in: 3600
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar tokin de autentificação!' });
  }
});

module.exports = router;
