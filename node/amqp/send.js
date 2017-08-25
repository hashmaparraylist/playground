var amqp = require('amqplib/callback_api');

amqp.connect('amqp://root:1q2w3e4r@172.60.1.15:5672', function(err, conn) {
  if (err != null) {
      console.log(err);
      return;
  }
  conn.createChannel(function(err, ch) {

    if (err != null) {
        console.log(err);
        return;
    }
    var q = 'hello';
    var msg = 'Hello World!';

    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
