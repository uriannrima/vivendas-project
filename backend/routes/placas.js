/** Definições de Rotas para Placas. **/
module.exports = function(app) {
    
    var url = "/api/placas";

    /**
     * Método GET para recuperar palcas dos carros.
     * 
     * @param {string} placa Placa do Veiculo.
     * @return {Array} Lista de todas veiculos com placa do parametro.
     */
    app.get(url, app.controllers.placas.selecionar);

}