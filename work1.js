var http = require('http');

var server = http.createServer(function (req, res) {
     res.statusCode = 404;
    res.statusMessage = 'not found'

  	var hi = `<!DOCTYPE html>
	<html>
	<head>
		<title></title>
	</head>
	<body>
	"welcome to my college"!
    <h1>About my college</h1>
	</body>
	</html>`;
	res.write(hi);
    res.write('page not found')
  	res.end();
});
server.listen(8080); 