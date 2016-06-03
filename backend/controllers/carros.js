/** Definições do Controller para Carros. **/
module.exports = function(app) {

    // Objeto para manter os controllers.
    var controller = {};

    /**
     * Método GET para recuperar carros.
     * 
     * @param {string} placa Placa do Veiculo.
     * @return {Array} Lista de todas veiculos com placa do parametro.
     */
    controller.selecionar = function(req, res) {
        // Create query.
        var query = "select id_car as 'id', de_placa as 'placa', id_pes as 'pessoaID', de_modelo as 'modelo', de_cor as 'cor' " +
            " from tvsgcar0 where 1 = 1";

        // Parametros da Query.
        var params = [];

        // Recuperar parametros.
        if (req.query.id) {
            query += " and id_car = ? ";
            params.push(req.query.id);
        }

        if (req.query.placa) {
            query += " and de_placa like ? ";
            params.push(req.query.placa);
        }

        if (req.query.pessoaID) {
            query += " and id_pes = ? ";
            params.push(req.query.pessoaID);
        }

        if (req.query.modelo) {
            query += " and de_modelo like ? ";
            params.push(req.query.modelo);
        }

        if (req.query.cor) {
            query += " and de_cor like ? ";
            params.push(req.query.cor);
        }

        app.database.mysql.connection.query(query, params,
            function(errors, rows, columns) {
                if (errors) {
                    console.log(errors);
                    app.database.mysql.reconectar();
                    return;
                }

                // res the result as json.
                res.json(rows);
            }
        );
    };

    /**
     * Método POST para registrar carros.
     * 
     * @param {string} placa Placa do carro.
     * @param {int} id_pes ID da Pessoa.
     * @param {string} modelo Modelo do Carro.
     * @param {string} cor Cor do Carro.
     * 
     * @return {int} ID do Carro incluido.
     */
    controller.inserir = function(req, res) {
        var query = "insert into tvsgcar0 (de_placa, id_pes, de_modelo, de_cor) values ( ?, ?, ?, ?)";

        // Recuperar modelo dos parametros.
        var carro = req.body;

        // Validação de parametros.
        if (carro && carro.placa && carro.pessoaID) {
            app.database.mysql.connection.query(
                query, [carro.placa.toUpperCase(), carro.pessoaID, carro.modelo.toUpperCase(), carro.cor.toUpperCase()],
                function(errors, rows, columns) {
                    
                if (errors) {
                    console.log(errors);
                    app.database.mysql.reconectar();
                    return;
                }

                    var resultado = {};
                    resultado.id = rows.insertId;
                    res.json(resultado);
                }
            );
        }
        else {

            // placa ou ID da Pessoa não foi informado.
            res.status(500).send("placa ou ID da Pessoa não foi informado.");
        }
    };

    return controller;
};