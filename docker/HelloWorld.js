var http = require('http');
var format = require('upper-case')

//create a server object:
http.createServer(function (req, res) {
  res.write(format.upperCase('Ola, mundo!')); //write a response to the client
  res.end(); //end the response
}).listen(2020); //the server object listens on port 8080  
