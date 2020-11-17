export default function (req, res, next) {
  res.status(404).json({
    message: 'Error in server',
  });
  next();
}
