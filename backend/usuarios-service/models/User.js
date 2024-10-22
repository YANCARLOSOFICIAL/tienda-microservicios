const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { 
    type: [String], 
    enum: ['user', 'admin'],  // Enum para los roles posibles
    default: ['user']         // El rol por defecto es 'user'
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Método para verificar si el usuario tiene un rol específico
userSchema.methods.hasRole = function (role) {
  return this.roles.includes(role);
};

module.exports = mongoose.model('User', userSchema);
