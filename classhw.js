var fs = require("fs");

var rdStream = fs.createReadStream('intro.txt');
var rdStream = fs.createReadStream('conclusion.txt');

var wrStream = fs.createWriteStream('report.txt');

rdStream.pipe(wrStream);

console.log("merging completed");