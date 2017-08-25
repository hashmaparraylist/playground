var amqp = require('amqplib');

amqp.connect('amqp://root:1q2w3e4r@maeda').then(conn => {
    setTimeout(function() { conn.close(); process.exit(0) }, 1500);
    return conn.createChannel();
}).then(ch => {
    var ex = 'tut.fanout';
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    ch.assertExchange(ex, 'fanout', {durable: true});
    ch.publish(ex, '', new Buffer(msg));
        
    //ch.sendToExchange(q, new Buffer(msg));
    console.log(' [x] Sent %s', msg);
});

