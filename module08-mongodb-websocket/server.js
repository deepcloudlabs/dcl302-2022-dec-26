const BINANCE_TICKER_PRICE_URL = "https://api.binance.com/api/v3/ticker/price";
import fetch from "node-fetch";
import {WebSocket} from "ws";

//region MongoDB Integration
import {connect, model, Schema, set, Types} from "mongoose";

const fieldMapper = {
    "s": "symbol",
    "E": "eventId",
    "p": "price",
    "q": "quantity",
    "b": "bid",
    "a": "ask",
    "t": "sequence",
    "T": "timestamp"
};

const tradeEvent = {
    "e": "trade",
    "E": 1672141053177,
    "s": "XRPBUSD",
    "t": 77730398,
    "p": "0.36780000",
    "q": "2293.00000000",
    "b": 1082422888,
    "a": 1082423052,
    "T": 1672141053177,
    "m": true,
    "M": true
};
set('strictQuery', true);
connect("mongodb://127.0.0.1:27017/binance", {
        "socketTimeoutMS": 0,
        "keepAlive": true,
        "useUnifiedTopology": true
    }, () => console.log("Connected to MongoDB...")
);

const tradeSchema = new Schema({
    "_id": Schema.Types.ObjectId,
    "symbol": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "quantity": {
        type: Number,
        required: true
    },
    "bid": {
        type: Number,
        required: true
    },
    "ask": {
        type: Number,
        required: true
    },
    "eventId": {
        type: Number,
        required: true
    },
    "sequence": {
        type: Number,
        required: true
    },
    "timestamp": {
        type: Number,
        required: true
    }
});
const Trade = model("trades", tradeSchema);
//endregion

const restWsUrl = "wss://stream.binance.com:9443/ws";

const symbols = await fetch(BINANCE_TICKER_PRICE_URL)
    .then(res => res.json())
    .then(tickers => tickers.map(ticker => ticker.symbol));

for (const symbol of symbols) {
    console.log(`Trying to make a websocket connection to the market ${symbol}...`);
    const ws = new WebSocket(`${restWsUrl}/${symbol.toLowerCase()}@trade`);
    ws.on('message', frame => {
        const binanceTrade = JSON.parse(frame);
        const dtoTrade = {};
        for (const field in fieldMapper) {
            const mappedField = fieldMapper[field];
            dtoTrade[mappedField] = binanceTrade[field];
        }
        dtoTrade._id = new Types.ObjectId();
        const trade = new Trade(dtoTrade);
        trade.save((err, status) => {
            if (err)
                console.error(err);
            else
                console.log(`The event (${dtoTrade.symbol}) is saved to the database.`)
        })
        // console.log(JSON.stringify(dtoTrade));
    });
}
