/** Definições do Controller para Visitas. **/
module.exports = function(app) {

    // Objeto para manter os controllers.
    var controller = {};

    /**
     * Método GET para recuperar visitas.
     * 
     * @param {int} id ID da visita.
     * @param {int} carroID ID do carro visitante.
     * @param {int} bloco Bloco visitado.
     * @param {int} apartamento Apartamento visitado.
     * @param {string} entrada Data/Hora de entrada.
     * @param {string} saida Data/Hora de saida.
     * 
     * @return {Array} Lista de todas visitas com respeito aos parametros.
     */
    controller.selecionar = function(req, res) {
        var query = "select vis.id_vis as 'id', car.de_placa as 'placa', car.id_car as 'carroID', " +
            "pes.de_nome as 'visitante', vis.cd_bloco as 'bloco', vis.cd_apartamento as 'apartamento', " +
            "date_format(vis.dh_entrada,'%Y-%m-%dT%TZ') as 'entrada', " +
            "date_format(vis.dh_saida,'%Y-%m-%dT%TZ') as 'saida', " +
            "case when (dh_saida is null) then 'S' else 'N' end as 'ativa' " +
            "from tvsgvis0 vis inner join tvsgcar0 car on vis.id_car = car.id_car " +
            "inner join tvsgpes0 pes on car.id_pes = pes.id_pes where 1 = 1 ";

        // Parametros da Query.
        var params = [];

        // Recuperar parametros.
        if (req.query.id) {
            query += " and vis.id_vis = ? ";
            params.push(req.query.id);
        }

        if (req.query.carroID) {
            query += " and car.id_car = ? ";
            params.push(req.query.carroID);
        }

        if (req.query.bloco) {
            query += " and vis.cd_bloco = ? ";
            params.push(req.query.bloco);
        }

        if (req.query.apartamento) {
            query += " and vis.cd_apartamento = ? ";
            params.push(req.query.apartamento);
        }

        if (req.query.entrada) {
            query += " and vis.dh_entrada = date_format(?,'%Y-%m-%dT%TZ') ";
            params.push(req.query.entrada);
        }

        // Feio demais, jesus cristo...
        if (req.query.ativa) {
            if (req.query.ativa.toUpperCase() == "TRUE" || req.query.ativa.toUpperCase() == "S") {
                query += " and vis.dh_saida is null ";
            }
            else if (req.query.ativa.toUpperCase() == "FALSE" || req.query.ativa.toUpperCase() == "N") {
                query += " and vis.dh_saida is not null ";
            }
        }
        else if (req.query.saida) {
            query += " and vis.dh_saida = date_format(?,'%Y-%m-%dT%TZ') ";
            params.push(req.query.saida);
        }
        
        query += " order by dh_entrada";

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
     * Método POST para registrar visitas.
     * 
     * @param {int} idCar ID do Carro.
     * @param {string} entrada Data/Horario de Entrada.
     * @param {int} bloco Bloco da Visita.
     * @param {int} apartamento Apartamento da Visita.
     * 
     * @return {int} ID da Visita incluida.
     */
    controller.inserir = function(req, res) {
        var query = "insert into tvsgvis0 (id_car, dh_entrada, cd_bloco, cd_apartamento) values (?, date_format(?,'%Y-%m-%dT%TZ'), ?, ?)";

        // Recuperar modelo dos parametros.
        var visita = req.body;

        // Validação de parametros.
        if (visita && visita.carroID && visita.entrada && visita.bloco && visita.apartamento) {
            app.database.mysql.connection.query(
                query, [visita.carroID, visita.entrada, visita.bloco, visita.apartamento],
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

            // ID do Carro, Entrada, bloco ou apartamento não informado.
            res.status(500).send("ID do Carro, Entrada, bloco ou apartamento não informado.");
        }
    };

    /**
     * Método PUT para atualizar uma visita.
     * 
     * @param {int} visitaID ID da Visita.
     * @param {string} saida Data/Horario de Saida do Visitante.
     */
    controller.atualizar = function(req, res) {

        // Because of C9 Time Zone
        // var query = "insert into tvsgvis0 (id_visit, dh_entrada, cd_bloco, cd_apartamento) values (?, NOW(), ?, ?)";
        var query = "update tvsgvis0 set id_car =  ?, cd_bloco = ?, cd_apartamento = ?, dh_entrada = str_to_date(?, '%d/%m/%Y %H:%i:%s'), dh_saida = str_to_date(?, '%d/%m/%Y %H:%i:%s') where id_vis = ?";

        // Parametros vindos do cliente.
        var id = req.body.id;
        var visita = req.body;

        // Se nome foi enviado.
        if (id) {
            // Executar query.
            app.database.mysql.connection.query(
                query, // Query
                [visita.carroID, visita.bloco, visita.apartamento, visita.entrada, visita.saida, id], // Parameters
                function(errors, rows, columns) // Callback (Errors, Rows, Columns)
                {
                    // Check if errors happened.
                    if (errors) {
                        console.log(errors);
                        app.database.mysql.reconectar();
                        return;
                    }

                    // res the result as json.
                    res.json(rows);
                }
            );
        }
    };

    return controller;
};