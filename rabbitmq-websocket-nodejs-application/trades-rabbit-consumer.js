let amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@127.0.0.1:5672', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        channel.consume('tradeq', msg => {
            if (msg.content) {
                console.log(msg.content.toString());
            }
        }, {noAck: true, exclusive: false});
    });
});