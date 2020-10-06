// node modules
const fs = require("fs");
const path = require("path");
// const http = require("http");
// const https = require("https");
const request = require("request");
const express = require("express");
const app = express();
const createShortcutUrl = require("create-url-shortcut");

// testing URL (need to replace with URL from digi-key API)
var testURL = "https://www.digikey.com/en/products/detail/comchip-technology/ACGRKM4007-HF/5013708?s=N4IgTCBcDaIGwBYCMBaJcDMCVhQOQBEQBdAXyA";

// creating shortcut url object (value: "", ext: "")
var componentShortURL = createShortcutUrl(testURL);

// root directory file path to be saved in
const rootFilePath = path.join(__dirname, "Component Files");
// current file name
// var curFileName = "test.url";

// // saving the shortcut object to a url file
// fs.writeFile(path.join(rootFilePath, curFileName), componentShortURL.value, (err) => {
//     if(err) {
//         return console.log(err);
//     } 
//     console.log("The file was saved!");
// });


// productID: 541-10.0KAFTR-ND
// productURL: https://www.digikey.com/en/products/detail/vishay-dale/CRCW251210K0FKEG/1173663?s=N4IgTCBcDaIKwBYCMBaJAGAdOg0gQQDEAVAJRQDkAREAXQF8g
// productDatasheet: https://www.vishay.com/docs/20035/dcrcwe3.pdf
// index: 2
//
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

    // //save the pdf for the product as a .pdf file
    // app.get('/download', (req, res) => {
    //     // filepath and name of pdf file
    //     const file = `${updatedPath}/${datasheetFileName}`;
    //     res.download(file);
    //     console.log("The pdf was saved");
    // });

    // http and https response
    const file = fs.createWriteStream(`${updatedPath}/${datasheetFileName}`);
    request.get(productDatasheet).pipe(file);
    console.log("The pdf was saved");
};

writeFiles("541-10.0KAFTR-ND", "https://www.digikey.com/en/products/detail/vishay-dale/CRCW251210K0FKEG/1173663?s=N4IgTCBcDaIKwBYCMBaJAGAdOg0gQQDEAVAJRQDkAREAXQF8g", "https://www.vishay.com/docs/20035/dcrcwe3.pdf", 2);