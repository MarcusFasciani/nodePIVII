var express    = require('express');
var app        = express();
var path       = require('path');
var http       = require('http');
var port       = process.env.PORT || 3000;
var load       = require('express-load');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var flash    = require('express-flash');
var multer         = require('multer');
var errorHandler   = require('errorhandler');
var cookie         = require('cookie-parser');
var session 			 = require('express-session');
//var mongoq = require('mongoq');

// Configurando a execução do banco MongoDB
//var COLLECTION = 'nodepivii';
//var DB = 'nodepivii';
//var db = mongoq(DB);
//var collection = db.collection(COLLECTION);




mongoose.connect(mongodb:<Marcus>:<123456a>@ds047632.mongolab.com:47632/nodepivii, function(err){
  if (err){
    console.log('Erro ao conectar: '+err);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.use(cookie());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8waibtec' }));
                  
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

load('models')
	.then('controllers')
	.then('routes')
	.into(app);

app.start = function() {
	server = http.createServer(app);
	server.listen(port, function() {
		console.log('Aplicação porta ' + port + '.');
	});
};

app.stop = function() {
	server.close();
	console.log('Aplicação finalizada.');
};

module.exports = app;
