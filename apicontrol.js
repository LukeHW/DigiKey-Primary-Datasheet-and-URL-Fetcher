// node modules
const fs = require("fs");
const path = require("path");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require("node-fetch");
const qs = require("qs");
require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

const client_id = "fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i";
const client_secret = "bOIpbcG6joybFtSe";

var jsonResponse = [];
var apiCode = "";


// MAIN CALL (change info after Products)
// https://api.digikey.com/Search/v3/Products/{PRODUCT_ID}?includes=ProductUrl%2CPrimaryDatasheet

// FIRST STEP: API AUTHORIZATION CODE URL ENDPOINT (1 min before expires)
// https://api.digikey.com/v1/oauth2/authorize?response_type=code&client_id=fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i&redirect_uri=https%3A%2F%2Flocalhost

// random testing -- ignore
// fetch(`https://api.digikey.com/v1/oauth2/authorize?response_type=code&client_id=fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i&redirect_uri=https%3A%2F%2Flocalhost`, {
//     method: "GET"
// }).then((res) => res.text())
// .then((data) => console.log(data))
// .catch((err) => console.log(err))

// SECOND STEP: example authorization code POST request (30 min before expires)
// const authData = {
//     code: "nFTsnEGZ",
//     client_id: "fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i",
//     client_secret: "bOIpbcG6joybFtSe",
//     redirect_uri: "https://localhost",
//     grant_type: "authorization_code"
// };

// console.log(qs.stringify(authData));

// fetch("https://api.digikey.com/v1/oauth2/token", {
//     method: "POST",
//     headers: {
//         "Host": "api.digikey.com",
//         "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: qs.stringify(authData)
// }).then((res) => res.json())
// .then((json) => console.log(json))
// .catch((err) => console.log(err))

//THIRD STEP (optional): getting refresh token (90 days before expires)
// const refreshData = {
//     client_id: "fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i",
//     client_secret: "bOIpbcG6joybFtSe",
//     refresh_token: "kC3kCt7zwSLsAQCVGw4l1AC2bqf8fmcL",
//     grant_type: "refresh_token"
// };

// fetch("https://api.digikey.com/v1/oauth2/token", {
//     method: "POST",
//     headers: {
//         "Host": "api.digikey.com",
//         "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: qs.stringify(refreshData)
// }).then((res) => res.json())
// .then((json) => console.log(json))
// .catch((err) => console.log(err))

// ACCESS TOKEN: 65sxOoIgDFMFOXN0dAl34lqjEn3A
// REFRESH TOKEN: IO6lFjns3Om3s59yxGDPBr9YFdMQoqvL

// LAST STEP: making an API call using GET
// Steps 1 and 2 need to be enabled each time this is done after 30 min
// main method the gets ProductURL and PrimaryDatasheet with given product_ID
module.exports.fetchFiles = (productID) => {
    var productID = productID;
    return fetch(`https://api.digikey.com/Search/v3/Products/${productID}?includes=ProductUrl%2CPrimaryDatasheet`, {
    method: "GET",
    headers: {
        "Host": "api.digikey.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-DIGIKEY-Client-Id": "fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i",
        // 30 min Auth Bearer Token
        "Authorization": "Bearer 65sxOoIgDFMFOXN0dAl34lqjEn3A",
        "X-DIGIKEY-Locale-Site": "US",
        "X-DIGIKEY-Locale-Language": "en",
        "X-DIGIKEY-Locale-Currency": "USD",
        "X-DIGIKEY-Locale-ShipToCountry": "us"
    }
}).then((res) => res.json())
.then((json) => {
    jsonResponse.push(json);
    console.log(json);
})
.catch((err) => console.log(err))
};

module.exports.getArray = () => {
    return jsonResponse;
};