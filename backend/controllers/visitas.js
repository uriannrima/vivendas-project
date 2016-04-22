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
        var query = "select vis.id_vis as 'ID', car.de_placa as 'Placa', car.id_car as 'CarroID', " +
            "pes.de_nome as 'Visitante', vis.cd_bloco as 'Bloco', vis.cd_apartamento as 'Apartamento', " +
            "date_format(vis.dh_entrada, '%d/%m/%Y %H:%i:%s') as 'Entrada', " +
            "date_format(vis.dh_saida, '%d/%m/%Y %H:%i:%s') as 'Saida', " +
            "case when (dh_saida is null) then 'S' else 'N' end as 'Ativa' " +
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
            query += " and vis.dh_entrada = str_to_date(?, '%d/%m/%Y %H:%i:%s') ";
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
            query += " and vis.dh_saida = str_to_date(?, '%d/%m/%Y %H:%i:%s') ";
            params.push(req.query.saida);
        }

        app.database.mysql.connection.query(query, params,
            function(e, r, c) {
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
        var query = "insert into tvsgvis0 (id_car, dh_entrada, cd_bloco, cd_apartamento) values (?, str_to_date(?, '%d/%m/%Y %H:%i:%s'), ?, ?)";

        // Recuperar modelo dos parametros.
        var visita = req.body.model;

        // Validação de parametros.
        if (visita && visita.CarroID && visita.Entrada && visita.Bloco && visita.Apartamento) {
            app.database.mysql.connection.query(
                query, [visita.CarroID, visita.Entrada, visita.Bloco, visita.Apartamento],
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

            // ID do Carro, Entrada, Bloco ou Apartamento não informado.
            res.status(500).send("ID do Carro, Entrada, Bloco ou Apartamento não informado.");
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
        var visita = req.body.model;

        // Se nome foi enviado.
        if (id) {
            // Executar query.
            app.database.mysql.connection.query(
                query, // Query
                [visita.CarroID, visita.Bloco, visita.Apartamento, visita.Entrada, visita.Saida, id], // Parameters
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

    return controller;
};