import dotenv from 'dotenv';
dotenv.config();

export async function getExchangeRate() {
  const myHeaders = new Headers();
  myHeaders.append("apikey", process.env.API_VALUE);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  const conv = await fetch ("https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD", requestOptions);
  const convResult = await conv.json();
  return convResult.rates.MYR;
}