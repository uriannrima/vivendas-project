// Utilizar API MySQL
var mysqlModule = require('mysql');

module.exports = function() {

    var mysql = {

        connection: null,

        connectionString: {
            host: "0.0.0.0",
            user: "uriannrima",
            password: "",
            database: "vivendas_db"
        },

        criarConexao: function() {
            this.connection = mysqlModule.createConnection(this.connectionString);
            this.gerenciarReconexao();
        },

        gerenciarReconexao: function() {
            var scope = this;
            this.connection.on('error', function(error) {
                console.log(error);
                scope.criarConexao();
            });
        },

        reconectar: function() {
            this.criarConexao();
        }
    };
    
    mysql.criarConexao();
    
    return mysql;
};