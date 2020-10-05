// node modules
const fs = require("fs");
const path = require("path");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const createShortcutUrl = require("create-url-shortcut");
const axios = require("axios");


const client_id = "fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i";
const client_secret = "bOIpbcG6joybFtSe";

// testing URL
var testURL = "https://www.digikey.com/en/products/detail/comchip-technology/ACGRKM4007-HF/5013708?s=N4IgTCBcDaIGwBYCMBaJcDMCVhQOQBEQBdAXyA";
// creating shortcut url object (value: "", ext: "")
var componentURL = createShortcutUrl(testURL);

// function httpGetAsync(theUrl, callback)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() { 
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//             console.log(XMLHttpRequest.responseText);
//     };
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
//     xmlHttp.send(null);
// };

// httpGetAsync("https://api.digikey.com/Search/v3/Products/{641-1634-2-ND}");

// MAIN CALL (change info after Products)
// https://api.digikey.com/Search/v3/Products/641-1634-2-ND?includes=ProductUrl%2CPrimaryDatasheet

// FIRST STEP: API AUTHORIZATION CODE URL ENDPOINT (1 min before expires)
// https://api.digikey.com/v1/oauth2/authorize?response_type=code&client_id=fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i&redirect_uri=https%3A%2F%2Flocalhost


// SECOND STEP: example authorization code POST request (30 min before expires)
// POST /v1/oauth2/token HTTP/1.1
// Host: api.digikey.com
// Content-Type: application/x-www-form-urlencoded

// code=lboI52TG&
// client_id={fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i}&
// client_secret={bOIpbcG6joybFtSe}&
// redirect_uri=https://localhost
// grant_type=authorization_code

// KNOWN BUGS: format of options and authData are incorrect. Not sure if they need to match Digi-Key's API or can be any

const options = {
    headers: {
        Host: "api.digikey.com",
        Content: "application/json"
    }
};

const authData = JSON.stringify({
    code: "8lfhkgFi",
    client_id: "fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i",
    client_secret: "bOIpbcG6joybFtSe",
    redirect_uri: "https://localhost",
    grant_type: "authorization_code"
});

axios
    .post("/v1/oauth2/token", authData, options)
    .then(res => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })


//THIRD STEP (optional): getting refresh token (90 days before expires)
// POST /v1/oauth2/token HTTP/1.1
// Host: api.digikey.com
// Content-Type: application/x-www-form-urlencoded

// client_id={application_client_id}&
// client_secret={application_client_secret}&
// refresh_token=123Asfeksodk/jkdsoieDSioIOS-483LidkOOl&
// grant_type=refresh_token