// Utilizar API MySQL
var mysql = require('mysql');

module.exports = function() {
    
    // Definição da connectionString.
    var connectionString = {
        host: "0.0.0.0",
        user: "uriannrima",
        password: "",
        database: "vivendas_db"
    };
    
    // Retornar conexão.
    return mysql.createConnection(connectionString);
};