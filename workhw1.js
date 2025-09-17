var http = require('http');

var server = http.createServer(function (req, res) {
     res.statusCode = 404;
    res.statusMessage = 'not found'

    var hello = `<!DOCTYPE html>
    <html>
    <head>
        <title></title>
    </head>
    <body>
    "welcome to my page"!
    <div class = about>
    <p>This is sample description about node js</p>
    </div>
    <div class = contact>
    <p>Contact us at:sam2344@gmail.com</p>
    </div>
    </body>
    </html>`;
    res.write(hello);
    res.write('page not found')
    res.end();
});
server.listen(3000); 