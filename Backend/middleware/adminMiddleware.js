const adminMiddleware = (req, res, next) => {
  if (req.user.userType !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};
module.exports = adminMiddleware;
