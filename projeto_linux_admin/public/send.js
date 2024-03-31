var http = require('http');
var url = require("url");
const enviarEmail = require('./nodemailer');

http.createServer(function (req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };

  var response = url.parse(req.url, true).query;
  var nome = response.nome;
  var status = response.status;
  var email = response.email;

  var amqp = require('amqplib/callback_api');
  var Buffer = require("buffer").Buffer
  amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
  throw error0;
  }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = 'hello';
      var msg = 'Prezado(a) ' + nome + ', seu pedido está ' + status;

      channel.assertQueue(queue, {
      durable: false
    });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(msg);

        const assunto = 'Status do Pedido';
        enviarEmail(email, assunto, msg);
        console.log(email);
    });
  });
  res.writeHead(200, headers);
  res.end();
}).listen(9000);