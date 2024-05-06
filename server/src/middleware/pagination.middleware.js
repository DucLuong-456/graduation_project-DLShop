const paginationMiddleware = (req, res, next) => {
  req.query.limit = parseInt(req.query.limit) || 15;
  req.query.page = parseInt(req.query.page) || 1;
  next();
};

module.exports = paginationMiddleware;
