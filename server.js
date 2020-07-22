const express = require('express');
//var dir = path.join(__dirname, 'public');
const app = express();

// body parser for taking my form data
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// setup the http port
app.listen(1999,()=>{
    console.log('server is running on localhost:1999');
});


// serve the routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});
app.get('/welcome', (req, res) => {
    res.sendFile(__dirname + '/welcome.html');
});

app.use(express.static(__dirname + '/'));


// store user data into json file
var fs = require('fs');

var userdata = fs.readFileSync('userdata.json');
var userd = JSON.parse(userdata);

app.post('/sign/data',function(req,res){
    var user = req.body.user;
    var pass = req.body.password;
    var email = req.body.email;
    var cont = req.body.contact;
    console.log(user);
    userd[userd.length]={
    user : {
        username : user,
        password : pass,
        email : email,
        contact : cont
        }
    };
    var data2 = JSON.stringify(userd, null, 2);
    fs.writeFile('userdata.json', data2, finished);
    var reply;

    function finished(err){
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        reply = {
            status: "success"
        };
        console.log(reply.status);
        res.redirect('/welcome');
    }
});

const config = require("./config");
const client = require("twilio")(config.accountSID, config.authToken);
var contact;

// function loginBack(req,res){
//     res.redirect('/login');
// }

app.post('/login/contact', function(req, res){
    console.log('call huaa');
    contact = Number(req.body.contact);
    var validNo = false;
    for(let i=0;i<userd.length;i++){
        if(contact==userd[i].user.contact){
            validNo = true;break;
        }
    }
    if(!validNo){
        res.status(200).send({result: 'redirect', url:'/login'});
    }else{
    client
        .verify
        .services(config.serviceID)
        .verifications
        .create({
            to: `+91${contact}`,
            channel: 'sms'
        })
        .then((data)=>{
            res.status(200).send(data);
        });
    // console.log(JSON.stringify(data));
    }
});

app.post('/verify', function(req, res){
    var code = Number(req.body.code);
    console.log("code mila",code);
    client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create({
            to: `+91${contact}`,
            code: code
        })
        .then((data)=>{
            if(data.valid){
                changePage();
            }else{
                backToLog();
            }
        });
    function changePage(){
        res.redirect('/welcome');
    }
    function backToLog(){
        res.redirect('/login');
    }
});













// app.get('/data/:word/:score?', addData);

// function addData(req, res){
//     var data = req.params;
//     var word = data.word;
//     var score = Number(data.score);
//     var reply;
//     if(!score){
//         reply = {
//             msg: 'score is required'
//         }
//         res.send(reply);
//     }
//     else{
//         words[word] = score;
//         var data = JSON.stringify(words, null, 2);
//         fs.writeFile('userdata.json', data, finished);

//         function finished(err){
//             reply = {
//                 word: word,
//                 score: score,
//                 status: "success"
//             }
//             res.send(reply);
//          }
//     }
// }