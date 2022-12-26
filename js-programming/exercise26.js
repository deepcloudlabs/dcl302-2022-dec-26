import {EventEmitter} from "events";
import fetch from "node-fetch";

const BINANCE_TICKER_PRICE_URL = "https://api.binance.com/api/v3/ticker/price";
let ticker = {"price": 0.0, "symbol": "BTCUSDT"};

const eventEmitter = new EventEmitter();
setInterval(async () => {
    let newTicker = await fetch(`${BINANCE_TICKER_PRICE_URL}?symbol=BTCUSDT`)
        .then(res => res.json());
    const eventData = {"newPrice": newTicker.price, "oldPrice": ticker.price};
    if (Number(newTicker.price) > Number(ticker.price))
        eventEmitter.emit('increment', eventData);
    else if (Number(newTicker.price) < Number(ticker.price))
        eventEmitter.emit('decrement', eventData);
    else
        eventEmitter.emit('stale', eventData);
    ticker = {...newTicker}
}, 1_000)

eventEmitter.on("increment", (e) => {
    console.log(`price has increased: ${JSON.stringify(e)}`);
});
eventEmitter.on("increment", async (e) => {
    console.log(`sending ASK order: ${JSON.stringify(e)}`);
});
eventEmitter.on("decrement", (e) => {
    console.log(`price has decreased: ${JSON.stringify(e)}`);
});
eventEmitter.on("decrement", async (e) => {
    console.log(`sending BID order: ${JSON.stringify(e)}`);
});
eventEmitter.on("stale", (e) => {
    console.log(`price does not change: ${JSON.stringify(e)}`);
});