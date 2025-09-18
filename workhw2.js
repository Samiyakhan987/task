var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var myfile = "." + q.pathname; 
  fs.readFile(myfile, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });

}).listen(8080);
var eventEmitter = new events.EventEmitter();
var myEventHandler = function () {
  console.log('I am happy!');
}
eventEmitter.on('hello', myEventHandler);
eventEmitter.emit('hello');