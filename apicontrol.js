// node modules
const fs = require("fs");
const path = require("path");
const http = require("http");
const createShortcutUrl = require("create-url-shortcut");

// testing URL
var testURL = "https://www.digikey.com/en/products/detail/comchip-technology/ACGRKM4007-HF/5013708?s=N4IgTCBcDaIGwBYCMBaJcDMCVhQOQBEQBdAXyA";

// using create-url-shortcut to make a shortcut JSON object with a given URL
var componentShortcutFile = JSON.stringify(createShortcutUrl(testURL));

var json = JSON.parse(componentShortcutFile);

// directory file path
const filePath = path.join(__dirname + "\\Component Files");

console.log(filePath);

// saving the shortcut object to a file
// KNOWN BUG: when outputting the information to a txt file, everything outputs the way it should, the issue is in the way the file is saved (fs.writeFile bug?)
fs.writeFile(path.join(filePath + "\\test.txt"), json.value, (err) => {
    if(err) {
        return console.log(err);
    } 
    console.log("The file was saved!");
});