const BINANCE_TICKER_PRICE_URL = "https://api.binance.com/api/v3/ticker/price";
import fetch from "node-fetch";

const symbols = await fetch(BINANCE_TICKER_PRICE_URL)
    .then(res => res.json())
    .then(tickers => tickers.map(ticker => ticker.symbol));
const tickers = [];
console.log("Started sending request...")
for (const symbol of symbols.splice(0, 20)) {
    const ticker = fetch(`${BINANCE_TICKER_PRICE_URL}?symbol=${symbol}`)
        .then(res => res.json());
    tickers.push(ticker);
}
console.log("Completed sending request...")
let prices = await Promise.all(tickers);
prices.forEach(price => console.log(price));