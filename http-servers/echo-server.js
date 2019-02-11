const http = require('http');

http
  .createServer()
  .on('error', (err) => {
    console.warn(`Echo-server error:${err.message}`);
  })
  .on('request', (req, res) => {
    req.pipe(res);
  })
  .listen(3000);
