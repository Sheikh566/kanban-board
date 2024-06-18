const requestLogger = (req, res, next) => {
  const { ip, method, originalUrl } = req;

  const startTime = Date.now();
  next();
  const { statusCode } = res;
  let contentLength = res.get('content-length');
  contentLength = contentLength ? `${contentLength}B - ` : '';

  let logMessage = `${ip} | ${method} ${originalUrl} ${statusCode} - ${contentLength}${Date.now() - startTime}ms`;

  if (['POST', 'PUT'].includes(method)) {
     logMessage += `\nBODY: ${JSON.stringify(req.body)}`;
  }

  console.log(logMessage);
};

module.exports = requestLogger;