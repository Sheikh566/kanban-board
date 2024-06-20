const { cliColorGreen, cliColorYellow } = require("../helper/util-helper");

const requestLogger = (req, res, next) => {
  const { ip, method, originalUrl } = req;

  const startTime = Date.now();
  next();
  let { statusCode } = res;
  if (statusCode >= 200 && statusCode < 300) {
    statusCode = cliColorGreen(statusCode);
  } else if (statusCode >= 400 && statusCode < 500) {
    statusCode = cliColorYellow(statusCode);
  } else {
    statusCode = cliColorRed(statusCode);
  }

  let contentLength = res.get('content-length');
  contentLength = contentLength ? `${contentLength}B - ` : '';

  let logMessage = `${cliColorGreen(ip)} | ${cliColorYellow(method)} ${originalUrl} ${statusCode} - ${contentLength}${Date.now() - startTime}ms`;

  if (['POST', 'PUT'].includes(method)) {
    logMessage += cliColorGreen(`\nBODY: ${JSON.stringify(req.body)}`);
  }

  console.log(logMessage);
};

module.exports = requestLogger;