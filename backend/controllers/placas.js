/** Definições do Controller para placas. **/
module.exports = function(app) {

    // Objeto para manter os controllers.
    var controller = {};

    /**
     * Método GET para recuperar palcas dos carros.
     * 
     * @param {string} placa placa do Veiculo.
     * @return {Array} Lista de todas veiculos com placa do parametro.
     */
    controller.selecionar = function(req, res) {
        // Query.
        var query = "select concat(de_placa, ' - ', de_nome, ' - ', case when (cd_bloco is null and cd_apartamento is null) then 'VISITANTE' else 'MORADOR' end) as displayField, pes.id_pes as 'pessoaID', car.id_car as 'carroID', de_placa as 'placa', de_nome as 'nome', " +
            " cd_bloco as 'bloco', cd_apartamento as 'apartamento', de_modelo as 'modelo', de_cor as 'cor', " +
            " case when (cd_bloco is null and cd_apartamento is null) then 'Visitante' else 'Morador' end as 'tipo' " +
            " from tvsgcar0 car inner join tvsgpes0 pes on car.id_pes = pes.id_pes";

        // Recuperar parametro de placa.
        var placa = req.query.placa;

        // Validar se enviado.
        if (placa) {
            // Alterar parametro para "começa com" e alterar query.
            placa += "%";
            query += " where de_placa like ?";
        }

        // Executar query no banco.
        app.database.mysql.connection.query(
            query, // Query
            [placa], // Parametros
            function(errors, rows, columns) // Callback (Errors, Rows, Columns)
            {
                // Validar erros.
                if (errors) {
                    console.log(errors);
                    app.database.mysql.reconectar();
                    return;
                }

                // Retornar JSON.
                res.json(rows);
            }
        );
    };

    return controller;
}