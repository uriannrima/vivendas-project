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
        var query = "select id_fot as 'ID', id_oco as 'OcorrenciaID', bl_foto as 'Arquivo' from tvsgfot0 where 1 = 1";

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
        app.database.mysql.connection.query(
            query, // Query
            params, // Parameters
            function(e, r, c) // Callback (Errors, Rows, Columns)
            {
                // Check if errors happened.
                if (e) {
                    console.log(e);
                    app.database.mysql.reconectar();
                    return;
                }

                // res the result as json.
                res.json(r);
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
            OcorrenciaID: req.body.model.ocorrenciaID,
            Arquivo: req.files.file
        };

        // Validação de parametros.
        if (foto && foto.OcorrenciaID && foto.Arquivo.path) {
            app.database.mysql.connection.query(
                query, [foto.OcorrenciaID, foto.Arquivo.path],
                function(e, r, c) {
                    if (e) {
                        console.log(e);
                        app.database.mysql.reconectar();
                        return;
                    }

                    // Remover foto temporária do servidor.
                    // Remover quando estiver de fato em uma maquina
                    // Utilizando somente para economizar espaço no C9.
                    fileSystem.unlink(foto.Arquivo.path);

                    // Retornar resultado.
                    var resultado = {};
                    resultado.ID = r.insertId;
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