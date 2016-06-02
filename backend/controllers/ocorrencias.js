/** Definições do Controller para Ocorrências. **/
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
        var query = "select oco.id_oco as 'id', oco.de_desc as 'descricao', oco.id_car as 'carroID', oco.cd_bloco as 'bloco', " +
            " oco.cd_apartamento as 'apartamento', date_format(oco.dh_ocorrencia, '%d/%m/%Y %H:%i:%s') as 'data' from tvsgoco0 oco where 1 = 1";

        // Parametros da Query.
        var params = [];

        // Recuperar parametros.
        if (req.query.id) {
            query += " and oco.id_oco = ? ";
            params.push(req.query.id);
        }

        if (req.query.descricao) {
            query += " and oco.de_desc = ? ";
            params.push(req.query.descricao);
        }

        if (req.query.carroID) {
            query += " and oco.id_car = ? ";
            params.push(req.query.carroID);
        }

        if (req.query.bloco) {
            query += " and oco.cd_bloco = ? ";
            params.push(req.query.bloco);
        }

        if (req.query.apartamento) {
            query += " and oco.cd_apartamento = ? ";
            params.push(req.query.apartamento);
        }

        if (req.query.data) {
            query += " and oco.dh_ocorrencia = str_to_date(?, '%d/%m/%Y %H:%i:%s') ";
            params.push(req.query.data);
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
     * Método POST para registrar ocorrências.
     * 
     * @return {int} ID da Ocorrência incluida.
     */
    controller.inserir = function(req, res) {
        var query = "insert into tvsgoco0 (de_desc, id_car, cd_bloco, cd_apartamento, dh_ocorrencia, dh_criacao) values (?, ? , ?, ?, str_to_date(?, '%d/%m/%Y %H:%i:%s'), SYSDATE())";

        // Recuperar modelo dos parametros.
        var ocorrencia = req.body;

        // Validação de parametros.
        if (ocorrencia && ocorrencia.descricao && ocorrencia.carroID && ocorrencia.bloco && ocorrencia.apartamento && ocorrencia.data) {
            app.database.mysql.query(
                query, [ocorrencia.descricao.toUpperCase(), ocorrencia.carroID, ocorrencia.bloco, ocorrencia.apartamento, ocorrencia.data],
                function(e, r, c) {
                    if (e) {
                        console.log(e);
                    }

                    var resultado = {};
                    resultado.ID = r.insertId;
                    res.json(resultado);
                }
            );
        }
        else {

            res.status(500).send("Ocorrência não preenchida corretamente.");
        }
    };
    
    return controller;
};