var http = require('http');
var fs = require('fs');


var api = 'http://api.hivoice.cn/USCService/WebApi';
var appid = '';
var appKey = '';

var files= [
  '8k.wav',
  'FkElvx9ailgxGK5TgY3_E6pYp72l.2',
  'FkElvx9ailgxGK5TgY3_E6pYp72l.1',
  'FkElvx9ailgxGK5TgY3_E6pYp72l',
  'story-58d28500f50ec954516fe3c2.mp3',
  'FoGfRbrL-_MiQQjm15kLE6Pqseti',
  'story-58d2840ff50ec954516fe3be.mp3'
];

var postOptions = {
  host: 'api.hivoice.cn',
  port: 80,
  path: '/USCService/WebApi?userid=' + appid + '&appkey=' + appKey + '&id=' + Date.now(),
  headers: {
    'Content-Type': 'audio/x-wav;codec=pcm;bit=16;rate=16000',
    'Accept': 'text/plain',
    'Accept-Language': 'zh-CN',
    'Accept-Charset': 'utf-8',
    'Transfer-Encoding': 'chunked',
    'Accept-Topic': 'general'
  },
  method: 'POST'
};

var MAX = 640;

files.forEach(function(file) {
  var buffer = fs.readFileSync('./temp/' + file);

  var stream = fs.createReadStream('./temp/' + file);
  var request = http.request(postOptions, function(res) {
    console.log('transfer ' + file + ' status: ' + res.statusCode);
    var body = ''
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      console.log('transfer ' + file + ' status: ' + res.statusCode + ' body: [' + chunk.toString() + ']');
      body += chunk;
    });
    res.on('end', function() {
      console.log('body:' + body);
    });
  }).on('error', function(error) {
    console.log(' error: [' + error.message + ']');
  });

  var length = buffer.length;
  var offset = 0;
  while (offset < length) {
    var size = (offset + MAX) >= length ? (length - offset): MAX;
    //console.log('upload offset :' + offset + ' size: ' + size);
    var upload = Buffer.from(buffer, offset, size);
    request.write(upload);
    offset += MAX;
  }
  request.end();
});


