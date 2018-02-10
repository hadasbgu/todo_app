var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var queries = require("./queryForDB.js");
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'tododb',
});

connection.connect(function(error){
	if(error){
		console.log('Error');
	} else {
		console.log('Connected');
	}
})

// express wait for the user to enter a URL
app.get('/',function(req,resp){
	 try {
        resp.redirect('index.html');
    } catch (e) {
        console.log("Can't get Index file" );
        resp.status(404).send();
    }
});

app.post('/login', function(req,resp){
 console.log("in login");
 try {
        var useremail = mysql.escape(req.body.useremail);
        var password = mysql.escape(req.body.password);

        console.log('Got a login request from: \n' + useremail + "," + password);

        var query = queries.getUserByEmail(useremail,password);
        connection.query(query, function(err,ans){
            if (err) {
                console.log("err" + err);
                resp.status(400).send("ERROR IN LOGIN");
            }
            else {
                console.log("ans:" + ans);
                if (ans.length > 0) {
                    resp.status(200).json(ans);
                    console.log('OK');
                }
                else {
                    resp.status(204).send('ERROR');
                    console.log('No Such User!\n');
                }
            }
        });
     
    }catch (err) {
        console.log("Error - " + err);
        resp.status(404).send();
    }

});


app.post('/register', function(req,resp){
 console.log("in register");
 console.log("req-\n" + req);
 try {
        var user_name = mysql.escape(req.body.username);
        var user_email = mysql.escape(req.body.email);
        var password = mysql.escape(req.body.password);

        console.log('Got a register request from: \n'
         + user_name + "," + password +"," +user_email);

        var query = queries.registerUser(user_name,user_email,password);
        connection.query(query, function(err,ans){
            if (err) {
                console.log("err" + err);
                resp.status(400).send("Email Already Register!\n");
            }
            else {
                console.log("ans:" + ans);
                resp.status(200).json(ans);
                console.log('OK');
            }
        });
     
    }catch (err) {
        console.log("Error - " + err);
        resp.status(404).send();
    }

});

app.post('/getUserNameByEmail', function(req,resp){
 console.log("in get user by Email");

try {
        var user_email = mysql.escape(req.body.useremail);
        // var user_email = "hadasg11@gmail.com";

        console.log('Got a GetName request from: ' + user_email);

        var query = queries.getUserNameByEmail(user_email);

        connection.query(query, function(err,ans){
            if (err) {
                console.log("err" + err);
                resp.status(400).send("No Such Email!\n");
            }
            else {
                console.log("ans:" + ans);
                resp.status(200).json(ans);
                console.log('OK');
            }
        });
     
    }catch (err) {
        console.log("Error - " + err);
        resp.status(404).send();
    }

});

app.post('/getTasksByEmail', function(req,resp){
 console.log("in get tasks by Email");

try {
        var user_email = mysql.escape(req.body.useremail);
        // var user_email = "hadasg11@gmail.com";

        console.log('Got a get tasks request from: ' + user_email);

        var query = queries.getUserTasksByEmail(user_email);
        
        connection.query(query, function(err,ans){
            if (err) {
                console.log("err" + err);
                resp.status(400).send("No Such Email!\n");
            }
            else {
                console.log("ans:" + ans);
                resp.status(200).json(ans);
                console.log('OK');
            }
        });
     
    }catch (err) {
        console.log("Error - " + err);
        resp.status(404).send();
    }

});


app.post('/addNewTaskByEmail', function(req,resp){
 console.log("in addNewTaskByEmail");

try {
        var user_email = mysql.escape(req.body.useremail);
        var status = mysql.escape(req.body.status);
        var item = mysql.escape(req.body.item);

        console.log('Got a addNewTaskByEmail request from: ' + user_email);

        var query = queries.addNewTaskByEmail(user_email,status,item);
        
        console.log("\n\n" + query);

        connection.query(query, function(err,ans){
            if (err) {
                console.log("err" + err);
                resp.status(400).send("No Such Email!\n");
            }
            else {
                console.log("ans:" + ans);
                resp.status(200).json(ans);
                console.log('OK');
            }
        });
     
    }catch (err) {
        console.log("Error - " + err);
        resp.status(404).send();
    }

});
app.post('/deleteTask', function(req,resp){
 console.log("in deleteTask");

try {
        var user_email = mysql.escape(req.body.useremail);
        var instanceTime = mysql.escape(req.body.instanceTime);

        console.log('Got a deleteTask request from: ' + user_email);

        var query = queries.deleteTaskByEmailAndTime(user_email,instanceTime);
        
        console.log("\n\n" + query);

        connection.query(query, function(err,ans){
            if (err) {
                console.log("err" + err);
                resp.status(400).send("No Such Email!\n");
            }
            else {
                console.log("ans:" + ans);
                resp.status(200).json(ans);
                console.log('OK');
            }
        });
     
    }catch (err) {
        console.log("Error - " + err);
        resp.status(404).send();
    }

});


app.listen(1337, function(){
    console.log('listening 1337');
});
