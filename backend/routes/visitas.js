/** Definições de Rotas para Visitas. **/
module.exports = function(app) {
    
    var url = "/api/visitas";

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
    app.get(url, app.controllers.visitas.selecionar);

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
    app.post(url, app.controllers.visitas.inserir);

    /**
     * Método PUT para atualizar uma visita.
     * 
     * @param {int} visitaID ID da Visita.
     * @param {string} saida Data/Horario de Saida do Visitante.
     */
    app.put(url, app.controllers.visitas.atualizar);
};