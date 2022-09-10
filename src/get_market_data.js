/* eslint-disable require-jsdoc */
const axios = require("axios");

async function getMarketData(tokenSymbol) {
    try {
        const URL = "https://alcor.exchange/api/markets";
        const markets = await axios.get(URL);

        // prettier-ignore
        for (let i = 0; i < markets.data.length; i++) {
            if (markets.data[i].base_token.symbol.name != "WAX") continue;
            if (markets.data[i].quote_token.symbol.name != tokenSymbol) continue;
            if (markets.data[i].volume24 === 0) continue;

            return markets.data[i].last_price;
        }
    } catch (error) {
        return getMarketData(tokenSymbol);
    }
}

module.exports = { getMarketData };
