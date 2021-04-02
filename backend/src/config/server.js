const port = 3003
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const mailer = require('nodemailer')

const transporter = mailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 465,
    secure: false,
    auth: {
      user: '8f0d24b329ae86',
      pass: '0bcebaeb9f3b16'
    }
})

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Rodando servidor de email');
  }
});

server.use(bodyParser.urlencoded({ extended: true}))
server.use(bodyParser.json())
server.use(allowCors)

server.post("/send-mail", (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var subject = req.body.subject
  var message = req.body.message
  var content = ` nome: ${name} \n email: ${email} \n assunto: ${subject} \n mensagem: ${message}`;

  var mail = {
    from: name,
    to: 'israel.kotzen@gmail.com',
    subject: subject,
    text: content
  }

    // const message = { 
    //     from: 'israel_cont@yahoo.com.br',
    //     to: 'israel.kotezen@gmail.com',
    //     subject: 'Projeto de software',
    //     text: 'Nodee lorem testte?'
    // }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
          res.json({
            status: 'fail'
          })
        } else {
          res.json({
           status: 'success'
          })
        }
    })

    // transporter.sendMail(message, (error,info) =>{
    //     if(error) {
    //         return res.status(500).send("falhou o email aentrega");
    //     }
    //     return res.status(200).send("Enviou");
    // })
})

server.listen(port, function(){
    console.log(`backend rodando ${port}`);
})

module.exports = server