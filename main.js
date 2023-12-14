const axios = require("axios");

const baseUrl = "https://api-pub.bitfinex.com/v2/";
const pathParams = "trades/fUSD/hist";
const queryParams = `limit=10000`;
const period = 120;

console.log(baseUrl + pathParams);

axios.get(`${baseUrl}/${pathParams}?${queryParams}`).then(
  (response) => {
    // console.log(response.data);
    let volume = 0;
    response.data.reverse().forEach((x) => {
      if (x[4] == period) {
        console.log(
          `${new Date(x[1]).toLocaleDateString()} ${new Date(
            x[1]
          ).toLocaleTimeString()}\t${Math.abs(x[2]).toFixed(4)}\t${(
            x[3] * 100
          ).toFixed(6)}%\t${x[4]}`
        );
        volume += Math.abs(x[2].toFixed(4));
      }
    });
    console.log(`Total volume: ${volume}`);
  },
  (error) => {
    console.log(error);
  }
);
