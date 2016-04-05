/* Template de Serviço. */
'use strict';

/**
 * Método para mapear URL e métodos do Template Service.
 * 
 * @param {ngResource} $resource Gerador de Recursos do Angular.
 * @return {ngResource} Recurso gerado do Angular.
 */
function templateService($resource) {

    // URL do Serviço.
    var serviceURL = "Service URL";

    // Métodos do Serviço.
    var serviceMethods = {
        get: {
            method: 'GET',
            cache: false,
            isArray: false
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

// Registrar Template Service.
appModule.factory('templateService', ['$resource', templateService]);