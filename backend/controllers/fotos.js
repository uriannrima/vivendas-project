// fileSystem API
var fileSystem = require('file-system');

/** Definições do Controller para Fotos. **/
module.exports = function(app) {

    // Objeto para manter os controllers.
    var controller = {};

    /**
     * Método GET para recuperar ocorrências.
     * 
     * @return {Array} Lista de todas ocorrências com respeito aos parametros.
     */
    controller.selecionar = function(req, res) {
        // Criar query.
        var query = "select id_fot as 'id', id_oco as 'ocorrenciaID', bl_foto as 'arquivo' from tvsgfot0 where 1 = 1";

        // Parametros da Query.
        var params = [];

        // Recuperar parametros.
        if (req.query.id) {
            query += " and id_fot = ? ";
            params.push(req.query.id);
        }

        if (req.query.ocorrenciaID) {
            query += " and id_oco = ? ";
            params.push(req.query.ocorrenciaID);
        }

        // Executar query.
        app.database.mysql.query(
            query, // Query
            params, // Parameters
            function(errors, rows, columns) // Callback (Errors, Rows, Columns)
            {
                // Check if errors happened.
                if (errors) {
                    console.log(errors);
                }

                // res the result as json.
                res.json(rows);
            }
        );
    };

    /**
     * Método POST para registrar fotos.
     * 
     * @return {int} ID da Foto incluida.
     */
    controller.inserir = function(req, res) {
        var query = "insert into tvsgfot0 (id_oco, bl_foto) values (?, LOAD_FILE(?))";

        // Recuperar modelo dos parametros.
        var foto = {
            ocorrenciaID: req.body.ocorrenciaID,
            arquivo: req.files.file
        };

        // Validação de parametros.
        if (foto && foto.ocorrenciaID && foto.arquivo.path) {
            app.database.mysql.query(
                query, [foto.ocorrenciaID, foto.arquivo.path],
                function(e, r, c) {
                    if (e) {
                        console.log(e);
                    }

                    // Remover foto temporária do servidor.
                    // Remover quando estiver de fato em uma maquina
                    // Utilizando somente para economizar espaço no C9.
                    fileSystem.unlink(foto.Arquivo.path);

                    // Retornar resultado.
                    var resultado = {};
                    resultado.id = r.insertId;
                    res.json(resultado);
                }
            );
        }
        else {

            res.status(500).send("Foto não preenchida corretamente.");
        }
    };
    
    return controller;
};