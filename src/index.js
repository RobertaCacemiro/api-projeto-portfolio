const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000
mongoose.connect('mongodb+srv://rubia_mongdb:<db_password>@api-projeto-portfolio.c9l1y92.mongodb.net/?appName=api-projeto-portfolio');

const Project = mongoose.model()

app.get('/', (req, res) => {
  res.send('Funciona!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
