const http = require('http');
const fs = require('fs');
const path = require('path');
const through2 = require('through2');

const server = http.createServer();
server.on('request', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  const message = 'Hello world!';
  fs.createReadStream(path.join(__dirname, '../index.html'), 'utf8')
    .pipe(through2(function (chunk, enc, callback) {
      this.push(`${chunk}`.replace('{message}', message));
      callback();
    })).pipe(res);
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(3000);
