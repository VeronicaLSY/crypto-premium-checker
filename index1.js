// npm install -s node-binance-api
// npm install dotenv
// npm install prompt-sync // NEW
const Binance = require('node-binance-api'); // making API calls to Binance
const binance = new Binance(); // new constructor
require("dotenv").config();
const prompt = require('prompt-sync')({sigint: true}); // NEW

async function lunoProcess() {
  let currency = prompt("Enter a valid cryptocurrency: ")// NEW
 
  // BTCMYR price from luno:
  const url = "https://api.luno.com/api/1/ticker?pair=" + currency + "MYR" // NEW
  const luno = await fetch(url); // NEW
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