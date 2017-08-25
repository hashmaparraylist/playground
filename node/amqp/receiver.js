var amqp = require('amqplib/callback_api');

amqp.connect('amqp://root:1q2w3e4r@172.60.1.15:5672', function(err, conn) {
  if (err != null) {
    console.log('Error:', err);
    return;
  }
  conn.createChannel(function(err, ch) {

    if (err != null) {
        console.log('Error:', err);
        return;
    }
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
