const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
username: { type: String, required: true, unique: true },
email: { type: String, required: true, unique: true },
passwordHash: { type: String, required: true },
avatar: { type: String },
bio: { type: String, default: '' },
score: { type: Number, default: 0 },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);