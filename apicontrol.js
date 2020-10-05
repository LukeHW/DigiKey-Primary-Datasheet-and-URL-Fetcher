// node modules
const fs = require("fs");
const path = require("path");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require("node-fetch");


const client_id = "fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i";
const client_secret = "bOIpbcG6joybFtSe";

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

const authData = {
    "code": "2DAT7yIy",
    "client_id": "fA8opoKWuuOAT74zaqHWs25ke6gdTZ1i",
    "client_secret": "bOIpbcG6joybFtSe",
    "redirect_uri": "https://localhost",
    "grant_type": "authorization_code"
};

fetch("https://api.digikey.com/v1/oauth2/token", {
    method: "POST",
    headers: {
        "Host": "api.digikey.com",
        "Content-Type": "application/json"
    },
    body: authData
}).then((res) => res.json())
.then((data) => console.log(data))
.catch((err) => console.log(err))

//THIRD STEP (optional): getting refresh token (90 days before expires)
// POST /v1/oauth2/token HTTP/1.1
// Host: api.digikey.com
// Content-Type: application/x-www-form-urlencoded

// client_id={application_client_id}&
// client_secret={application_client_secret}&
// refresh_token=123Asfeksodk/jkdsoieDSioIOS-483LidkOOl&
// grant_type=refresh_token