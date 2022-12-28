const Websocket = require('ws');
const binanceWssUrl = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const ws = new Websocket(binanceWssUrl);

let amqp = require('amqplib/callback_api');


amqp.connect('amqp://guest:guest@127.0.0.1:5672', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((channel_error, channel) => {
        if (channel_error) {
            throw channel_error;
        }
        ws.on('message', (frame) => {
            let trade = JSON.parse(frame);
            let volume = Number(trade.p) * Number(trade.q);
            trade.volume = volume;
            console.log(trade)
            channel.publish('tradex', '', Buffer.from(JSON.stringify(trade)));
        });
    });
});