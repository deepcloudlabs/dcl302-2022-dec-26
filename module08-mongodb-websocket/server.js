const BINANCE_TICKER_PRICE_URL = "https://api.binance.com/api/v3/ticker/price";
import fetch from "node-fetch";
import {WebSocket} from "ws";

const restWsUrl = "wss://stream.binance.com:9443/ws";
const symbols = await fetch(BINANCE_TICKER_PRICE_URL)
    .then(res => res.json())
    .then(tickers => tickers.map(ticker => ticker.symbol));
for (const symbol of symbols) {
    console.log(`Trying to make a websocket connection to the market ${symbol}...`);
    const ws = new WebSocket(`${restWsUrl}/${symbol.toLowerCase()}@trade`);
    ws.on('message', frame => {
        const trade = JSON.parse(frame);
        console.log(JSON.stringify(trade));
    });
}
