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
        var query = "select pes.id_pes as 'ID', pes.de_nome as 'Nome', " +
            "case when (pes.cd_bloco is null and pes.cd_apartamento is null) then 'Visitante' else 'Morador' end as 'Tipo', " +
            "pes.cd_bloco as 'Bloco', pes.cd_apartamento as 'Apartamento', car.de_placa as 'Placa' " +
            "from tvsgpes0 pes inner join tvsgcar0 car on car.id_pes = pes.id_pes " +
            "where 1 = 1 ";

        // Parametros da Query.
        var params = [];

        // Recuperar parametros.
        if (req.query.id) {
            query += " and pes.id_pes = ? ";
            params.push(req.query.id);
        }

        if (req.query.nome) {
            query += " and pes.de_nome = ? ";
            params.push(req.query.nome);
        }

        if (req.query.bloco) {
            query += " and pes.cd_bloco = ? ";
            params.push(req.query.bloco);
        }

        if (req.query.apartamento) {
            query += " and pes.cd_apartamento = ? ";
            params.push(req.query.apartamento);
        }

        query += " order by pes.de_nome";


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
        var pessoa = req.body.model;

        // Validação de parametros.
        if (pessoa && pessoa.Nome) {
            app.database.mysql.connection.query(
                query, [pessoa.Nome.toUpperCase(), pessoa.Bloco, pessoa.Apartamento],
                function(e, r, c) {
                    if (e) {
                        console.log(e);
                        app.database.mysql.reconectar();
                        return;
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
        var pessoa = req.body.model;

        // Se nome foi enviado.
        if (id) {
            // Executar query.
            app.database.mysql.connection.query(
                query, // Query
                [pessoa.Nome, pessoa.Bloco, pessoa.Apartamento, id], // Parameters
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
            app.database.mysql.connection.query(
                query, // Query
                [id], // Parameters
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
        }
    };

    // Retornar controller.
    return controller;
};