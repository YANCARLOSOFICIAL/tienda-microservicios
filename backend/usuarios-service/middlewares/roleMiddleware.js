// Middleware para verificar si el usuario tiene un rol requerido
exports.requireRole = (requiredRoles) => {
    return (req, res, next) => {
      const user = req.user; // El usuario debería estar autenticado y cargado en req.user
      if (!user) {
        return res.status(401).json({ error: 'No estás autenticado' });
      }
      
      // Verificar si el usuario tiene alguno de los roles requeridos
      const hasRole = requiredRoles.some(role => user.roles.includes(role));
      
      if (!hasRole) {
        return res.status(403).json({ error: 'No tienes permisos para acceder a esta ruta' });
      }
      
      next();
    };
  };
  