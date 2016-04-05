/** Definições de Rotas para Pessoas. **/
module.exports = function(app, conn) {
    
    /**
     * Método GET para recuperar pessoas.
     * 
     * @param {int} id ID da pessoa.
     * @param {string} nome Nome da pessoa.
     * @param {int} bloco Bloco da pessoa.
     * @param {int} apartamento Apartamento da pessoa.
     * 
     * @return {Array} Lista de todas pessoas com respeito aos parametros.
     */
    app.get("/api/pessoas",
        // Request, Response
        function(req, res) {
            // Criar query.
            var query = "select id_pes as 'ID', de_nome as 'Nome', " +
                "case when (cd_bloco is null and cd_apartamento is null) then 'Visitante' else 'Morador' end as 'Tipo', " +
                "cd_bloco as 'Bloco', cd_apartamento as 'Apartamento' " +
                "from tvsgpes0 where 1 = 1 ";

            // Parametros da Query.
            var params = [];

            // Recuperar parametros.
            if (req.query.id) {
                query += " and id_pes = ? ";
                params.push(req.query.id);
            }

            if (req.query.nome) {
                query += " and de_nome = ? ";
                params.push(req.query.nome);
            }

            if (req.query.bloco) {
                query += " and cd_bloco = ? ";
                params.push(req.query.bloco);
            }

            if (req.query.apartamento) {
                query += " and cd_apartamento = ? ";
                params.push(req.query.apartamento);
            }

            // Executar query.
            conn.query(
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
        }
    );

    /**
     * Método POST para registrar pessoas.
     * 
     * @param {string} nome Nome da Pessoa.
     * @param {int} bloco Bloco da Pessoa.
     * @param {int} apartamento Apartamento da Pessoa.
     * 
     * @return {int} ID da Pessoa incluida.
     */
    app.post("/api/pessoas",
        function(req, res) {
            var query = "insert into tvsgpes0 (de_nome, cd_bloco, cd_apartamento) values (?, ? , ?)";
            
            // Recuperar modelo dos parametros.
            var pessoa = req.body.model;

            // Validação de parametros.
            if (pessoa && pessoa.Nome) {
                conn.query(
                    query, [pessoa.Nome.toUpperCase(), pessoa.Bloco, pessoa.Apartamento],
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
                // Nome não foi informado.
                res.status(500).send("Parametro 'Nome' não foi passado.");
            }
        }
    );



    /**
     * Método PUT para atualizar pessoas.
     * 
     * @param {id} id ID da Pessoa.
     * @param {PessoaModel} pessoa Modelo de Pessoa.
     */
    app.put("/api/pessoas",
        // Request, Response
        function(req, res) {
            // Criar query.
            var query = "update tvsgpes0 set de_nome = ?, cd_bloco = ?, cd_apartamento = ? where id_pes = ?";

            // Parametros vindos do cliente.
            var id = req.body.id;
            var pessoa = req.body.model;

            // Se nome foi enviado.
            if (id) {
                // Executar query.
                conn.query(
                    query, // Query
                    [pessoa.Nome, pessoa.Bloco, pessoa.Apartamento, id], // Parameters
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
            }
        }
    );

    /**
     * Método DELETE para deletar pessoas.
     * 
     * @param {id} id ID da Pessoa.
     */
    app.delete("/api/pessoas",
        // Request, Response
        function(req, res) {
            // Criar query.
            var query = "delete from tvsgpes0 where id_pes = ?";

            // Parametros vindos do cliente.
            var id = req.query.id;

            // Se nome foi enviado.
            if (id) {
                // Executar query.
                conn.query(
                    query, // Query
                    [id], // Parameters
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
            }
        }
    );
};