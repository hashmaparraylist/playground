//var amqp = require('amqplib/callback_api');

var amqp = require('amqplib');

amqp.connect('amqp://root:1q2w3e4r@172.60.1.15').then(conn => {
    return conn.createChannel();
}).then(ch => {
    var ex = 'logs';
    
    ch.assertExchange(ex, 'fanout', {durable: false});
    return ch.assertQueue('', {exclusive: true}).then(q => {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');
      return ch.consume(q.queue, function(msg) {
        console.log(" [x] %s", msg.content.toString());
      }, {noAck: true});

    });
}).catch(console.warn); 

/*
amqp.connect('amqp://root:1q2w3e4r@172.60.1.15', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s", msg.content.toString());
      }, {noAck: true});
    });
  });
});
*/
