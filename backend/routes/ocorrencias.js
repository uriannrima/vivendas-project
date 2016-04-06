/** Definições de Rotas para Ocorrências. **/
module.exports = function(app) {

    // URL destas API.
    var url = "/api/ocorrencias";

    /**
     * Método GET para recuperar ocorrências.
     * 
     * @return {Array} Lista de todas ocorrências com respeito aos parametros.
     */
    app.get(url, app.controllers.ocorrencias.selecionar);

    /**
     * Método POST para registrar ocorrências.
     * 
     * @return {int} ID da Ocorrência incluida.
     */
    app.post(url, app.controllers.ocorrencias.inserir);
};