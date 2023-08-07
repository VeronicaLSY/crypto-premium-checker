import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;
const url_str = `https://v6.exchangerate-api.com/v6/` + API_KEY + `latest/USD`;

export async function getExchangeRate() {
  const url = new URL(url_str);
  const request = await fetch(url);
  const response = await request.json();
  return response.conversion_rates.MYR;
}