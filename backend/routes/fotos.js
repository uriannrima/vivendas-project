/** Definições de Rotas para Fotos. **/
module.exports = function(app) {

    // URL destas API.
    var url = "/api/fotos";

    // API utilizada parar recuperar arquivos através de POST/PUT.
    var multipart = require('connect-multiparty');

    // Instancia do Multipart Middleware.
    var multipartMiddleware = multipart({
        // Diretório para onde as fotos irão.
        uploadDir: '/home/ubuntu/workspace/tmp/'
    });

    /**
     * Método GET para recuperar fotos.
     * 
     * @return {Array} Lista de todas fotos com respeito aos parametros.
     */
    app.get(url, app.controllers.fotos.selecionar);

    /**
     * Método POST para registrar fotos.
     * 
     * @return {int} ID da Foto incluida.
     */
    app.post(url, multipartMiddleware, app.controllers.fotos.inserir);
};