// node modules
const fs = require("fs");
const path = require("path");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require("node-fetch");
const qs = require("qs");


const client_id = "fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i";
const client_secret = "bOIpbcG6joybFtSe";

// MAIN CALL (change info after Products)
// https://api.digikey.com/Search/v3/Products/{PRODUCT_ID}?includes=ProductUrl%2CPrimaryDatasheet

// FIRST STEP: API AUTHORIZATION CODE URL ENDPOINT (1 min before expires)
// https://api.digikey.com/v1/oauth2/authorize?response_type=code&client_id=fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i&redirect_uri=https%3A%2F%2Flocalhost

// SECOND STEP: example authorization code POST request (30 min before expires)
//
// EXAMPLE
//
//
// POST /v1/oauth2/token HTTP/1.1
// Host: api.digikey.com
// Content-Type: application/x-www-form-urlencoded

// code=lboI52TG&
// client_id={fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i}&
// client_secret={bOIpbcG6joybFtSe}&
// redirect_uri=https://localhost
// grant_type=authorization_code

// const authData = {
//     code: "H7dKOEaB",
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
//
// EXAMPLE
//
//
// POST /v1/oauth2/token HTTP/1.1
// Host: api.digikey.com
// Content-Type: application/x-www-form-urlencoded

// client_id={application_client_id}&
// client_secret={application_client_secret}&
// refresh_token=123Asfeksodk/jkdsoieDSioIOS-483LidkOOl&
// grant_type=refresh_token

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

// ACCESS TOKEN: pCqU7myrSdALJWCLrrtlBoABanLA
// REFRESH TOKEN: aRV7MJGGyuI1Vjl8YqC1040RiNcrMA7U

// LAST STEP: making an API call using GET
//
// EXAMPLE:
//
// GET /Search/v3/Products/p5555-nd HTTP/1.1
// Host: api.digikey.com
// X-DIGIKEY-Client-Id: heWGx9w6DK8kZf3jRv5E9jUAhXrGBU67
// Authorization: Bearer s4T5DbmFZadjNRAEbUnN9zkU3DBj
// X-DIGIKEY-Locale-Site: US
// X-DIGIKEY-Locale-Language: en
// X-DIGIKEY-Locale-Currency: USD
// X-DIGIKEY-Locale-ShipToCountry: us
// X-DIGIKEY-Customer-Id: 0

// Steps 1 and 2 need to be enabled each time this is done after 30 min
// main method the gets ProductURL and PrimaryDatasheet with given product_ID
fetch("https://api.digikey.com/Search/v3/Products/641-1634-2-ND?includes=ProductUrl%2CPrimaryDatasheet", {
    method: "GET",
    headers: {
        "Host": "api.digikey.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-DIGIKEY-Client-Id": "fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i",
        // 30 min Auth Bearer Token
        "Authorization": "Bearer pCqU7myrSdALJWCLrrtlBoABanLA",
        "X-DIGIKEY-Locale-Site": "US",
        "X-DIGIKEY-Locale-Language": "en",
        "X-DIGIKEY-Locale-Currency": "USD",
        "X-DIGIKEY-Locale-ShipToCountry": "us"
    }
}).then((res) => res.json())
.then((json) => console.log(json))
.catch((err) => console.log(err))