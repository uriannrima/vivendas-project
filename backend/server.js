// ================================================
// Requerimentos do Servidor:

// Utilizar API Express.
var express = require('express');

// Criar variavel para conter referencia para nossa aplicação utilizando Express.
var app = express();

// Utilizar API MySQL
var mysql = require('mysql');

// Usar API Morgan Logger.
var morgan = require('morgan');

// Utilizar Body-Parser responsavle por recuperar e tratar informações vindas pelo HTTP POST.
var bodyParser = require('body-parser');

// Usar Method-Override para "emular" HTML PUT/DELETE no Express.
var methodOverride = require('method-override');

// API utilizada parar recuperar arquivos através de POST/PUT.
var multipart = require('connect-multiparty');

// Instancia do Multipart Middleware.
var multipartMiddleware = multipart({
    // Diretório para onde as fotos irão.
    uploadDir: '/home/ubuntu/workspace/tmp/'
});

// fileSystem API
var fileSystem = require('file-system');

// ================================================
// Configurações do servidor:

// Definir caminho "root":
app.use(express.static('/home/ubuntu/workspace/public'));

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

// ================================================
// Configuração da conexão com banco de dados:

// Definição da connectionString.
var connectionString = {
    host: "0.0.0.0",
    user: "uriannrima",
    password: "",
    database: "vivendas_db"
};

// Criar conexão.
var conn = mysql.createConnection(connectionString);

// ================================================
// Implementação do serviço:

// Callback para situações de erro.
app.on('error', function(error) {
    console.log("Error: \n" + error.message);
    console.log(error.stack);
});

// Definir rotas de pessoas.
require("./routes/pessoasRoute")(app, conn);

// Definir rotas de visitas.
require("./routes/visitasRoute")(app, conn);

// Definir rotas de carros.
require("./routes/carrosRoute")(app, conn);

// Definir rotas de placas.
require("./routes/placasRoute")(app, conn);

// Definir rotas de ocorrências.
require("./routes/ocorrenciasRoute")(app, conn);

// Definir rotas de fotos.
require("./routes/fotosRoute")(app, multipartMiddleware, fileSystem, conn);

// Definir rota genérica para retornar Index.html
app.get('/', function(req, res) {
    res.status(200).set({
        'content-type': 'text/html; charset=utf-8'
    }).sendfile('index.html', {
        root: '../public'
    });
});

// Iniciar servidor.
app.listen(process.env.PORT,
    function() {
        console.log('Server running...');
    }
);