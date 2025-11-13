const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userSecret: { type: String, required: true }
}, { collection: 'user' }); // Nome da coleção

module.exports = mongoose.model('User', UserSchema);
