/** Definições de Rotas para Home. **/
module.exports = function(app) {
    
    /**
     * Método GET para retornar pagina inicial.
     */
    app.get('/', app.controllers.home.index);

};