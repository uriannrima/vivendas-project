/** Definições do Controller para Pessoas. **/
module.exports = function(app) {

    // Objeto para manter os controllers.
    var controller = {};
    
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
    controller.selecionar = function(req, res) {

        // Criar query.
        var query = "select id_pes as 'id', de_nome as 'nome', " +
            "case when (cd_bloco is null and cd_apartamento is null) then 'Visitante' else 'Morador' end as 'tipo', " +
            "cd_bloco as 'bloco', cd_apartamento as 'apartamento' " +
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
        
        query += " order by de_nome";
        

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
     * Método POST para registrar pessoas.
     * 
     * @param {string} nome Nome da Pessoa.
     * @param {int} bloco Bloco da Pessoa.
     * @param {int} apartamento Apartamento da Pessoa.
     * 
     * @return {int} ID da Pessoa incluida.
     */
    controller.inserir = function(req, res) {
        var query = "insert into tvsgpes0 (de_nome, cd_bloco, cd_apartamento) values (?, ? , ?)";

        // Recuperar modelo dos parametros.
        var pessoa = req.body;

        // Validação de parametros.
        if (pessoa && pessoa.nome) {
            app.database.mysql.query(
                query, [pessoa.nome.toUpperCase(), pessoa.bloco, pessoa.apartamento],
                function(e, r, c) {
                    if (e) {
                        console.log(e);
                    }

                    var resultado = {};
                    resultado.id = r.insertId;
                    res.json(resultado);
                }
            );
        }
        else {
            // Nome não foi informado.
            res.status(500).send("Parametro 'Nome' não foi passado.");
        }
    };
    
    /**
     * Método PUT para atualizar pessoas.
     * 
     * @param {id} id ID da Pessoa.
     * @param {PessoaModel} pessoa Modelo de Pessoa.
     */
    controller.atualizar = function(req, res) {
        // Criar query.
        var query = "update tvsgpes0 set de_nome = ?, cd_bloco = ?, cd_apartamento = ? where id_pes = ?";

        // Parametros vindos do cliente.
        var id = req.body.id;
        var pessoa = req.body;

        // Se nome foi enviado.
        if (id) {
            // Executar query.
            app.database.mysql.query(
                query, // Query
                [pessoa.nome, pessoa.bloco, pessoa.apartamento, id], // Parameters
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
    };

    /**
     * Método DELETE para deletar pessoas.
     * 
     * @param {id} id ID da Pessoa.
     */
    controller.excluir = function(req, res) {
        // Criar query.
        var query = "delete from tvsgpes0 where id_pes = ?";

        // Parametros vindos do cliente.
        var id = req.query.id;

        // Se nome foi enviado.
        if (id) {
            // Executar query.
            app.database.mysql.query(
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
    };

    // Retornar controller.
    return controller;
};