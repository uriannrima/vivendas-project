/* Serviço de Foto. */
'use strict';

/**
 * Método para mapear URL e métodos do Template Service.
 * 
 * @param {ngResource} $resource Gerador de Recursos do Angular.
 * @return {ngResource} Recurso gerado do Angular.
 */
function FotoService($resource) {

    // URL do Serviço.
    var serviceURL = "/api/fotos";

    // Métodos do Serviço.
    var serviceMethods = {
        get: {
            method: 'GET',
            cache: false,
            isArray: true
        },
        save: {
            method: 'POST',
            cache: false,
            isArray: false
        },
        update: {
            method: 'PUT',
            cache: false,
            isArray: false
        },
        delete: {
            method: 'DELETE',
            cache: false,
            isArray: false
        }
    };

    // Criar recurso.
    return $resource(serviceURL, {}, serviceMethods);
}

// Registrar Foto Service.
vivendasServices.factory('FotoService', ['$resource', FotoService]);