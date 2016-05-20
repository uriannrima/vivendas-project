// Utilizar API Express.
var express = require('express');

// Usar API Morgan Logger.
var morgan = require('morgan');

// Utilizar Body-Parser responsavle por recuperar e tratar informações vindas pelo HTTP POST.
var bodyParser = require('body-parser');

// Usar Method-Override para "emular" HTML PUT/DELETE no Express.
var methodOverride = require('method-override');

module.exports = function() {

    // Criar variavel para conter referencia para nossa aplicação utilizando Express.
    var app = express();

    // Configurações do servidor:

    // Definir caminho "root":
    
    // Angular 1
    //app.use(express.static('/home/ubuntu/workspace/public'));
    
    // Angular 2
    app.use(express.static('/home/ubuntu/workspace/frontend'));

    // log every req to the console
    app.use(morgan('dev'));

    // Parse HTML post to application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        'extended': 'true'
    }));

    // Parse HTML post to application/json
    app.use(bodyParser.json());

    // Parse application/vnd.api+json as json
    app.use(bodyParser.json({
        type: 'application/vnd.api+json'
    }));

    // Method override to use PUT/DELETE.
    app.use(methodOverride());

    // Callback para situações de erro.
    app.on('error', function(error) {
        console.log("Error: \n" + error.message);
        console.log(error.stack);
    });

    // Retornar aplicação.
    return app;
};