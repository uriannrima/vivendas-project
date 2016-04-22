/** Definições do Controller para Placas. **/
module.exports = function(app) {

    // Objeto para manter os controllers.
    var controller = {};

    /**
     * Método GET para recuperar palcas dos carros.
     * 
     * @param {string} placa Placa do Veiculo.
     * @return {Array} Lista de todas veiculos com placa do parametro.
     */
    controller.selecionar = function(req, res) {
        // Query.
        var query = "select concat(de_placa, ' - ', de_nome, ' - ', case when (cd_bloco is null and cd_apartamento is null) then 'VISITANTE' else 'MORADOR' end) as displayField, pes.id_pes as 'PessoaID', car.id_car as 'CarroID', de_placa as 'Placa', de_nome as 'Nome', " +
            " cd_bloco as 'Bloco', cd_apartamento as 'Apartamento', de_modelo as 'Modelo', de_cor as 'Cor', " +
            " case when (cd_bloco is null and cd_apartamento is null) then 'Visitante' else 'Morador' end as 'Tipo' " +
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
            function(e, r, c) // Callback (Errors, Rows, Columns)
            {
                // Validar erros.
                if (e) {
                    console.log(e);
                    app.database.mysql.reconectar();
                    return;
                }

                // Retornar JSON.
                res.json(r);
            }
        );
    };
    
    return controller;
}