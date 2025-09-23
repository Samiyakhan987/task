var fs = require('fs');
var rdata = '';

var rdStream = fs.createReadStream('book.txt');
rdStream.setEncoding('UTF8');

rdStream.on('data', function(chunk) {
   rdata += chunk;
});

rdStream.on('end',function() {
   console.log(rdata);
});

rdStream.on('error', function(err) {
   console.log(err.stack);
});

console.log("Program has Ended");