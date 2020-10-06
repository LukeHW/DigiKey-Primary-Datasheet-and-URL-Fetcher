// node modules
const fs = require("fs");
const path = require("path");
const request = require("request");
const product = require("./apicontrol.js");
const createShortcutUrl = require("create-url-shortcut");
const readline = require("readline");

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
    var folderName = `(${index}) ${productID}`;
    var productURL = createShortcutUrl(productURL);
    var productDatasheet = productDatasheet;

    // updatedPath with index and product ID
    var updatedPath = path.join(rootFilePath, folderName);

    // create new folder in rootFilePath
    // make sure updated Path is correct!!!
    fs.mkdir(updatedPath, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("New directory successfully created.");
        }
    });

    // save the shortcut for the product as a .url file
    fs.writeFile(path.join(updatedPath, shortFileName), productURL.value, (err) => {
        if(err) {
            return console.log(err);
        } 
        console.log("The shortcut was saved!");
    });

    // http/https response using request -- saves .pdf file
    const file = fs.createWriteStream(`${updatedPath}/${datasheetFileName}`);
    request.get(productDatasheet).pipe(file);
    console.log("The pdf was saved");
};
// example writeFiles method call
//writeFiles("541-10.0KAFTR-ND", "https://www.digikey.com/en/products/detail/vishay-dale/CRCW251210K0FKEG/1173663?s=N4IgTCBcDaIKwBYCMBaJAGAdOg0gQQDEAVAJRQDkAREAXQF8g", "https://www.vishay.com/docs/20035/dcrcwe3.pdf", 2);

// reading the file and calling methods
async function processLineByLine() {
    const fileStream = fs.createReadStream('parts.txt');
    var index = 1;
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
  
    for await (const productID of rl) {
      // Each line in input.txt will be successively available here as `productID`.
      console.log(`Line from file: ${productID}, index: ${index}`);
      // should return pdf url and product url
      product.fetchFiles(productID);
      // updating index after we read a line in the file
      console.log(product.getArray());
      //writeFiles(productID, jsonResponse.ProductURL, jsonResponse.PrimaryDatasheet, index);
      index++;
    }
};
  
processLineByLine();