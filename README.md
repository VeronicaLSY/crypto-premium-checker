# crypto-premium-checker

This is a tool to calculate and display the premium of a cryptocurrency on Luno exchange compared to Binance.

## Installation

- Make sure you have Node.js installed.
- Clone this repository.
- Run `npm install` to install dependencies.

## Usage

1. Run the tool using the command `npm start`.
2. Enter the cryptocurrency symbol you want to analyze when prompted.

## Features

- Real-time price updates.
- Supports multiple cryptocurrencies.

## Accessing Restricted Services (Using a VPN)

If you are located in a region where certain services, such as Binance, are restricted, you can use a VPN (Virtual Private Network) to access them. A VPN routes your internet traffic through a secure server, allowing you to bypass regional restrictions.

Follow these steps to use a VPN and access restricted services:

1. **Sign Up for Cloudflare VPN:**
   If you don't have a Cloudflare account, sign up for their VPN service [here](https://www.cloudflare.com/vpn).

2. **Install and Configure VPN:**
   Download and install the Cloudflare VPN app on your device. Log in with your Cloudflare account.

3. **Connect to a VPN Server:**
   Open the Cloudflare VPN app and connect to a server location where the restricted service is accessible. Choose a server that meets your needs and provides a reliable connection.

4. **Run Your Application:**
   With the VPN active, run your application as usual. The VPN will route your traffic through the selected server.

5. **Testing and Troubleshooting:**
   Test your application to ensure that it functions properly with the VPN. If you encounter any issues, try different server locations or adjust VPN settings.

## Obtaining API Key for Exchange Rate

To fetch real-time exchange rates, you need an API key from ExchangeRate-API. Follow these steps to obtain your API key:

1. Visit [ExchangeRate-API](https://www.exchangerate-api.com/).
2. Sign up for an account if you don't have one.
3. Once logged in, navigate to your account settings or dashboard.
4. Locate your API key and copy it to your clipboard.

## Configuring Your API Key

1. Create a `.env` file in the root directory of the project.
2. Open the `.env` file in a text editor.
3. Add the following line to the file, replacing `YOUR_API_KEY_HERE` with your actual API key: API_KEY=YOUR_API_KEY_HERE
4. Save and close the `.env` file.


