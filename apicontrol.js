// node modules
const fs = require("fs");
const path = require("path");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const createShortcutUrl = require("create-url-shortcut");

// testing URL
var testURL = "https://www.digikey.com/en/products/detail/comchip-technology/ACGRKM4007-HF/5013708?s=N4IgTCBcDaIGwBYCMBaJcDMCVhQOQBEQBdAXyA";
// creating shortcut url object (value: "", ext: "")
var componentURL = createShortcutUrl(testURL);

// root directory file path to be saved in
const rootFilePath = path.join(__dirname, "Component Files");
// current file name
var curFileName = "test.url";

// saving the shortcut object to a url file
fs.writeFile(path.join(rootFilePath, curFileName), componentURL.value, (err) => {
    if(err) {
        return console.log(err);
    } 
    console.log("The file was saved!");
});

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
            console.log(XMLHttpRequest.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
};

httpGetAsync("https://sandbox-api.digikey.com/Search/v3/Products/{641-1634-2-ND}");