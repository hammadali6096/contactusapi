// create an express app
const express = require("express")
const bodyParser = require("body-parser")
const app = express();
var nodemailer = require('nodemailer');

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// define the first route
app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>")
})

// 
app.post("/contact_us", function (req, res) {
    console.log(req.body);
    var email = req.body.email;
    var name = req.body.name;
    var subject = req.body.subject;
    var msg = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: 'Hamadalihaadi598@gmail.com',
            pass: '72547826598393270'
        }
    });
    var mailOptions = {
        from: 'Hamadalihaadi598@gmail.com',
        to: email,
        subject: 'SQM',
        text: 'Your email has been recieved.I will answer your query as soon as possible'
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