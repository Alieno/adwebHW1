var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");


app.use(express.static('public'));

app.get('/*\.html', function (req, res) {
	console.log("app");
   	res.sendFile( __dirname + req.originalUrl);
})

app.get('/*\.js', function (req, res) {
	console.log("app");
   	res.sendFile( __dirname + req.originalUrl);
})

app.get('/*\.css', function (req, res) {
	console.log("app");
   	res.sendFile( __dirname + req.originalUrl);
})

//app.get('/login.html', function (req, res) {
//   	res.sendFile( __dirname + "/" + "login.html" );
//})

//app.get('/register.html', function (req, res) {
//   	res.sendFile( __dirname + "/" + "register.html" );
//})

app.get('/finish_login', function (req, res) {

   	// 输出 JSON 格式
   	response = {
       	email:req.query.email,
       	password:req.query.password
   	};
   	
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       	data = JSON.parse( data );
       	console.log( data );
       	var occupy = false;
       	for(i in data){
       		
       		if(response.email == data[i].email&&response.password == data[i].password){
       			occupy = true;
       		}
       	}
       	console.log(i);
       	if(occupy){
       		res.end("Login Successfully!");
       	}
       	else{
       		res.end("Wrong email or password!");
       	}
       	
   	});


})

app.get('/finish_register', function (req, res) {

   	// 输出 JSON 格式
   	response = {
   		name:req.query.user,
       	email:req.query.email,
       	password:req.query.password
   	};

   	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       	data = JSON.parse( data );
       	console.log( data );
       	var occupy = false;
       	for(i in data){
       		
       		if(response.email == data[i].email||response.name == data[i].name){
       			occupy = true;
       		}
       	}
       	console.log(i);
       	if(occupy){
       		res.end("Email Occupied");
       	}
       	else{
       		data[parseInt(i)+1] = response;
       		fs.writeFile('users.json', JSON.stringify(data),  function(err) {
   				if (err) {
       				return console.error(err);
   				}
   			});
       		res.end("Registered!")
       		console.log( JSON.stringify(data));
       	}
       	
   	});



   	
})

var server = app.listen(8081, function () {

  	var host = server.address().address
  	var port = server.address().port

  	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})