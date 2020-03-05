const express = require('express');
const router = express.Router();
const cors = require('cors'); //needed to disable sendgrid security
const sgMail = require('@sendgrid/mail'); //sendgrid library to send emails 
const EmailList = require("../model/emailList");

router.use(cors()); //so the browser doesn't restrict data, without it Sendgrid will not send
sgMail.setApiKey('');//api key needed, if you want to test it, create an account on sendgrid or ask a developer for a key
//you can get your api from here https://app.sendgrid.com/ 

router.get('/emailList', async function (req, res) {
  try {
    const emails = await EmailList.find();
    res.send(emails);
  }
  catch (e) {
    res.status(500).send(e);
  }
});

router.post('/emailList', async function (req, res) {
  try {
    const email = await EmailList.create(req.body);
    res.send(email);
  }
  catch (e) {
    res.status(500).send(e);
  }
});

router.post('/send-email', async function (req, res) {
  try {
    const dbemails = await EmailList.find();
    const email = req.body;
    let flag = false;

    dbemails.forEach(p => {
      if (p.email == email.email) {
        flag = true
      } return flag;
    });

    if (flag) {
      res.send('Ya estas subscripto a nuestras ultimas noticias')
    }
    else {

      const email = await EmailList.create(req.body);
      res.send("Email : " + email.email + " was added to EmailList collection");

      const msg = { //Sendgrid Data Requirements
        to: email.email,
        from: "",// You can use a disposable mail from this page https://temp-mail.org/en/ or you can use your own mail
        subject: "Rolling Shop", 
        text: "Gracias por suscribirte"
      }

      sgMail.send(msg)//Send Email
        .then(console.log("Email was sent"));
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
