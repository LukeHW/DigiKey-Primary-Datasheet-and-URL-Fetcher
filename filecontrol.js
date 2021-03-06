// node modules
const fs = require("fs");
const path = require("path");
const product = require("./apicontrol.js");
const createShortcutUrl = require("create-url-shortcut");
const readline = require("readline");
const request = require("request");
require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
const download = require("download-pdf");

// root directory file path to be saved in
const rootFilePath = path.join(__dirname, "Component Files");

// Example params:
// productID: 541-10.0KAFTR-ND
// productURL: https://www.digikey.com/en/products/detail/vishay-dale/CRCW251210K0FKEG/1173663?s=N4IgTCBcDaIKwBYCMBaJAGAdOg0gQQDEAVAJRQDkAREAXQF8g
// productDatasheet: https://www.vishay.com/docs/20035/dcrcwe3.pdf
// index: 2
var writeFiles = (productID, productURL, productDatasheet, index) => {
    var shortFileName = `${productID} Digi-Key Webpage.url`;
    var datasheetFileName = `${productID} Datasheet.pdf`;
    var folderName = `(${index + 1}) ${productID}`;
    var productURL = createShortcutUrl(productURL);
    var productDatasheet = productDatasheet;

    // updatedPath with index and product ID
    var updatedPath = path.join(rootFilePath, folderName);

    var finalPathName = `${updatedPath}/${datasheetFileName}`;

    // create new folder in rootFilePath
    fs.mkdir(updatedPath, function(err) {
        if (err) {
            console.log(err);
        } 
    });

    // save the shortcut for the product as a .url file
    fs.writeFile(path.join(updatedPath, shortFileName), productURL.value, (err) => {
        if(err) {
            return console.log(err);
        } 
    });

    // http/https response using request -- saves .pdf file
    const download = (url, dest, cb) => {
        const file = fs.createWriteStream(dest);
        const sendReq = request.get(url);
    
        // verify response code
        sendReq.on('response', (response) => {
            if (response.statusCode !== 200) {
                return cb('Response status was ' + response.statusCode);
            }
            sendReq.pipe(file);
        });
    
        // close() is async, call cb after close completes
        file.on('finish', () => file.close(cb));
    
        // check for request errors
        sendReq.on('error', (err) => {
            fs.unlinkSync(dest);
            return cb(err.message);
        });
    
        file.on('error', (err) => { // Handle errors
            fs.unlinkSync(dest); // Delete the file async. (But we don't check the result)
            return cb(err.message);
        });
    };

    download(productDatasheet, finalPathName, () => {
        console.log("pdf was downloaded and saved");
    });
};

// reading the file and calling methods
async function processLineByLine() {
    const fileStream = fs.createReadStream('parts.txt');
    var index = 0;
    var urlArray = [];
    var productIDArray = [];
    var productURL = "";
    var productDatasheet = "";

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    
    // gathering urls for all productIDs in parts.txt, placing in local urlArray
    for await (const productID of rl) {
      // adding productID to the global array
      productIDArray.push(productID);
      // should return pdf url and product url
      await product.fetchFiles(productID);
    };

    // getting the finished urlArray from the API file
    urlArray = product.getArray();

    urlArray.forEach((obj) => {
        productURL = obj.ProductUrl;
        productDatasheet = obj.PrimaryDatasheet;
        writeFiles(productIDArray[index], productURL, productDatasheet, index);
        index++;
    })
};
  
processLineByLine();