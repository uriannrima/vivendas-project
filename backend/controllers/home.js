/** Definições do Controller para Home. **/
module.exports = function(app) {

    // Objeto para manter os controllers.
    var controller = {};
    
    /**
     * Método GET para retornar pagina inicial.
     */
    controller.index = function(req, res) {

        // Definir content Type.
        var contentType = {
            'content-type': 'text/html; charset=utf-8'
        };

        // enviar resposta.
        res.status(200).set(contentType).sendfile('index.html', {
            root: '../public'
        });
    };

    return controller;
};