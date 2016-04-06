/** Definições de Rotas para Carros. **/
module.exports = function(app) {
    
    var url = "/api/carros";

    /**
     * Método GET para recuperar carros.
     * 
     * @param {string} placa Placa do Veiculo.
     * @return {Array} Lista de todas veiculos com placa do parametro.
     */
    app.get(url, app.controllers.carros.selecionar);

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
    app.post(url, app.controllers.carros.inserir);
};