require('dotenv').config();

const express = require('express')
const mongoose = require('./src/config/db');

const app = express();
app.use(express.json());

const authRoutes = require('./src/routes/auth');
const projectRoutes = require('./src/routes/ProjectRoutes');

app.use('/', authRoutes);
app.use('/', projectRoutes);

app.get('/verificacao', (req, res) => {
  res.send('API para cadastro de projetos a serem utilizado em portfolios, está funcioando!')
})

const port = 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));