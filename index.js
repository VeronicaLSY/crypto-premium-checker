// npm install -s node-binance-api
// npm install dotenv
const Binance = require('node-binance-api'); // making API calls to Binance
const binance = new Binance(); // new constructor
require("dotenv").config();

async function lunoProcess() {
  // BTCMYR price from luno:
  const luno = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR");
  const lunoResult = await luno.json();
  const btcMyr = Math.trunc(lunoResult.last_trade);
  console.log(`BTCMYR price on Luno:`.padEnd(30) + `MYR ${btcMyr}`);
  
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
    console.log(`USDMYR:`.padEnd(30) + `${rate}`);

  // BTCUSD price on Luno:
  const btcUsd = btcMyr/rate;
  console.log(`BTCUSD price on Luno:`.padEnd(30) + `USD ${btcUsd}`);
  
  // BTCUSD price on Binance:
  const ticker = await binance.prices();
  const btcbUsd = ticker.BTCUSDT;
  console.log(`BTCUSD price on Binance:`.padEnd(30) + `USD ${btcbUsd}`);
  
  // Price difference:
  const priceDiff = btcUsd - ticker.BTCUSDT;
  console.log(`Price difference:`.padEnd(30) + `USD ${priceDiff}`);

  // Luno premium:
  const lunopremium = (priceDiff/btcbUsd).toFixed(4);
  console.log(`Luno premium:`.padEnd(30) + `${lunopremium}%`);
}

lunoProcess();