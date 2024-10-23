// Middleware para verificar si el usuario tiene un rol requerido
exports.requireAdminRole = (req, res, next) => {
  if (!req.user.roles.includes('admin')) {
    return res.status(403).json({ error: 'Acceso denegado. No tienes permisos.' });
  }
  next();
};

  
  