/** Definições de Rotas para Carros. **/
module.exports = function(app, conn) {

    /**
     * Método GET para recuperar carros.
     * 
     * @param {string} placa Placa do Veiculo.
     * @return {Array} Lista de todas veiculos com placa do parametro.
     */
    app.get("/api/carros",
        function(req, res) {
            // Create query.
            var query = "select id_car as 'ID', de_placa as 'Placa', id_pes as 'PessoaID', de_modelo as 'Modelo', de_cor as 'Cor' " +
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

            conn.query(query, params,
                function(e, r, c) {
                    if (e) {
                        console.log(e);
                    }

                    // res the result as json.
                    res.json(r);
                }
            );
        }
    );

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
    app.post("/api/carros",
        function(req, res) {
            var query = "insert into tvsgcar0 (de_placa, id_pes, de_modelo, de_cor) values ( ?, ?, ?, ?)";
            
            // Recuperar modelo dos parametros.
            var carro = req.body.model;

            // Validação de parametros.
            if (carro && carro.Placa && carro.PessoaID) {
                conn.query(
                    query, [carro.Placa.toUpperCase(), carro.PessoaID, carro.Modelo.toUpperCase(), carro.Cor.toUpperCase()],
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

                // Placa ou ID da Pessoa não foi informado.
                res.status(500).send("Placa ou ID da Pessoa não foi informado.");
            }
        }
    );
};