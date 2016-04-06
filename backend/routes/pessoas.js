/** Definições de Rotas para Pessoas. **/
module.exports = function(app) {
    
    var url = "/api/pessoas";
    
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
    app.get(url, app.controllers.pessoas.selecionar);

    /**
     * Método POST para registrar pessoas.
     * 
     * @param {string} nome Nome da Pessoa.
     * @param {int} bloco Bloco da Pessoa.
     * @param {int} apartamento Apartamento da Pessoa.
     * 
     * @return {int} ID da Pessoa incluida.
     */
    app.post(url, app.controllers.pessoas.inserir);
    
     /**
     * Método PUT para atualizar pessoas.
     * 
     * @param {id} id ID da Pessoa.
     * @param {PessoaModel} pessoa Modelo de Pessoa.
     */
    app.put(url, app.controllers.pessoas.atualizar);

    /**
     * Método DELETE para deletar pessoas.
     * 
     * @param {id} id ID da Pessoa.
     */
    app.delete(url, app.controllers.pessoas.excluir);
};