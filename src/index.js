const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const port = 3000
mongoose.connect('mongodb+srv://rubia_mongdb:bdoxA6PityTdiIC7@api-projeto-portfolio.c9l1y92.mongodb.net/?appName=api-projeto-portfolio');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stacks: {
    type: [String], 
    default: [] 
  },
  image_url: String,
  access_url: String, 
  repository_url: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
});

const Project = mongoose.model('Project', ProjectSchema);

app.get('/', (req, res) => {
  res.send('Funciona!')
})

app.post("/cadastro", async (req, res) => {
  console.log("TESTE", req.body);
  const project = new Project({
    title: req.body.title, 
    description: req.body.description, 
    stacks: req.body.stacks, 
    image_url: req.body.image_url, 
    access_url: req.body.access_url, 
    repository_url: req.body.repository_url, 
    status: req.body.status
})

  await project.save()
  res.send(project)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
