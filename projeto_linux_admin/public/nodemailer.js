

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mkyourburger@gmail.com', 
    pass: 'arny nmio cmhb qcwv' 
  }
});


async function enviarEmail(destinatario, assunto, mensagem) {
  try {
    
    const mailOptions = {
      from: 'Make Your Burger',
      to: destinatario,
      subject: assunto,
      text: mensagem,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.response);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

module.exports = enviarEmail;
