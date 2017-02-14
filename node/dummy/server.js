const http = require('http');

http.createServer((req, res) => {
  console.log(req.url);
  res.body = req.url;
  res.statusCode = 200;
  res.end();
}).listen(5000);
