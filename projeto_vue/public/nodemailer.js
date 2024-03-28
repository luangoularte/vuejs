

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'luan.ag2012gk@gmail.com', 
    pass: 'jgny mrcp citm gkkc' 
  }
});


async function enviarEmail(destinatario, assunto, mensagem) {
  try {
    
    const mailOptions = {
      from: 'luan.ag2012gk@gmail.com',
      to: destinatario,
      subject: assunto,
      text: mensagem
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.response);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

module.exports = enviarEmail;
