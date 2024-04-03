var http = require('http');
var url = require("url");
const enviarEmail = require('./nodemailer');

console.log("send running!")

http.createServer(function (req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };

  var response = url.parse(req.url, true).query;
  var nome = response.nome;
  var option = response.option;
  var email = response.email;
  var colunaDisparada = response.colunaDisparada;

  var amqp = require('amqplib/callback_api');
  var Buffer = require("buffer").Buffer
  amqp.connect('amqp://rabbit', function(error0, connection) {
    
  if (error0) {
      throw error0;
    }
    
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = 'hello';

      if (colunaDisparada === "status") {

        var msg = 'Prezado(a) ' + nome + ', seu pedido está ' + option;

        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(msg);

        var assunto = 'Status do Pedido';

      } else {

        var msg = 'Prezado(a) ' + nome + ', seu pedido se encontra ' + option;

        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(msg);

        var assunto = 'Status do Pagamento';
        
      }
      
      enviarEmail(email, assunto, msg);
      console.log(email);
    });
  });
  res.writeHead(200, headers);
  res.end();
}).listen(9000);