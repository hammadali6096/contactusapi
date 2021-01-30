// create an express app
const express = require("express")
const bodyParser = require("body-parser")
const app = express();
var nodemailer = require('nodemailer');
var cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// define the first route
app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>")
})

// 
app.post("/contact_us", function (req, res) {
    var email = req.body.email;
    var name = req.body.name;
    var subject = req.body.subject;
    var msg = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    var mailOptions = {
        from: process.env.EMAIL,
        to: process.env.TO_EMAIL,
        subject: subject,
        html: "<strong><p>Name: </strong> " + name + " </p> <b></b><strong> <p>Sender Email: </strong> "+email+"</p><b></b><strong> <p>Message: </strong> </p><b></b>"+ msg
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send(true)
        }
    });


})

// start the server listening for requests
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));