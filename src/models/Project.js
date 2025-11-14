const mongoose = require('mongoose');

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
  repository_url: String,
  status: {
    type: Boolean,
    default: false
  },
}, { collection: 'projects' }); 

module.exports = mongoose.model('Project', ProjectSchema);
