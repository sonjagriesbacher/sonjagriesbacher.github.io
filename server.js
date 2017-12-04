/**
 * Created by sonja on 05.11.2017.
 */
"use strict";

var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = 8080;

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/auswahl', function (req, res) {
    res.render('auswahl');
});

app.post('/send-email', function (req, res) {

    console.log(req.body);

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'sueterminabfrage@gmail.com',
            pass: 'Terminabfrage123'
        }
    });

    let mailOptions = {
        from: req.body.from, // sender address
        to: '<sueterminabfrage@gmail.com>', // list of receivers
        subject: 'Terminanfrage von ' + req.body.name, // Subject line
        text: 'Nachname: ' + req.body.name + ', Vorname: ' + req.body.vorname2 + ', E-Mail-Adresse: ' + req.body.email + ', Telefonnummer/Handynummer: ' + req.body.nummer + ', Herren: ' + req.body.herren + ', Damen: ' + req.body.damen + ', Dienstleistung: ' + req.body.anderes +  ', Sonstige Anmerkungen: ' + req.body.sonstiges + ', Ausgewählter Termin: ' + req.body.Termine, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('bestaetigung');
    });
});

app.listen(port, function (req, res) {
    console.log('Server is running at port: ', port);
});