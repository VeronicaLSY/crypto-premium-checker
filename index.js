// npm install -s node-binance-api
// npm install dotenv
const Binance = require('node-binance-api'); // making API calls to Binance
const binance = new Binance(); // new constructor
require("dotenv").config();

async function lunoProcess() {
  const alignment = "text-align: right"
  // BTCMYR price from luno:
  const luno = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR");
  const lunoResult = await luno.json();
  const btcMyr = Math.trunc(lunoResult.last_trade);
  console.log(`%c BTCMYR price on Luno: MYR ${btcMyr}`, alignment);
  
  // Exchange rate: 
  const myHeaders = new Headers();
  myHeaders.append("apikey", process.env.API_VALUE);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
    const conv = await fetch ("https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD", requestOptions);
    const convResult = await conv.json();
    const rate = convResult.rates.MYR;
    console.log(`%c USDMYR: ${rate}`, alignment);

  // BTCUSD price on Luno:
  const btcUsd = btcMyr/rate;
  console.log(`%c BTCUSD price on Luno: USD ${btcUsd}`, alignment);
  
  // BTCUSD price on Binance:
  const ticker = await binance.prices();
  const btcbUsd = ticker.BTCUSDT;
  console.log(`%c BTCUSD price on Binance: USD ${btcbUsd}`, alignment);
  
  // Price difference:
  const priceDiff = btcUsd - ticker.BTCUSDT;
  console.log(`%c Price difference: USD ${priceDiff}`, alignment);

  // Luno premium:
  const lunopremium = (priceDiff/btcbUsd).toFixed(4);
  console.log(`%c Luno premium: ${lunopremium}%`, alignment);
}

lunoProcess();