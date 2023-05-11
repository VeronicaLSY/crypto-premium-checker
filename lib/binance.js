// npm install -s node-binance-api

// getting price of BTC in USD on Binance:

import Binance from 'node-binance-api'; // making API calls to Binance

export async function getBinanceBTCPriceInUSD() {
  const binance = new Binance(); // new constructor 
  const ticker = await binance.prices();
  return ticker.BTCUSDT;
}