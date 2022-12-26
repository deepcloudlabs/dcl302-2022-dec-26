import { WebSocket} from "ws";
const restWsUrl = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const ws = new WebSocket(restWsUrl);
ws.on('message', frame => {
    const trade = JSON.parse(frame);
    console.log(JSON.stringify(trade));
});