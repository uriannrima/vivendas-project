// usar exec para executar métodos de verificação e restart do servidor de MySQL.
var exec = require('child_process').exec;

// Invocar checagem do servidor a cada X minutos.
var tempoChecagem = 1;

module.exports = function(app) {

    // Método para checar o servidor.
    function checarBD() {
        //console.log("Checando servidor de banco.");
        exec("mysql-ctl status", function(error, stdout, stderr) {
            if (error !== null) {
                console.log('Erro ao tentar checar o MySQL: ' + error);
            }
            if (stderr.toUpperCase().indexOf("RUNNING") > -1) {
                //console.log("Servidor OK");
            }
            else {
                console.log("MySQL Fora.");
                console.log("Tentando restartar o MySQL.");
                exec("mysql-ctl restart", function(error, stdout, stderr) {
                    if (error !== null) {
                        console.log('Erro ao tentar recuperar o MySQL: ' + error);
                    }
                    console.log('MySQL reiniciado.');
                });
            }
        });
    }

    setInterval(checarBD, tempoChecagem * 60000);
    
    checarBD(); // Fazer primeira checagem.
};