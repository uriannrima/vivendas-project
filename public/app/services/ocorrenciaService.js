/* Serviço de Ocorrência. */
'use strict';

/**
 * Método para mapear URL e métodos do Template Service.
 * 
 * @param {ngResource} $resource Gerador de Recursos do Angular.
 * @return {ngResource} Recurso gerado do Angular.
 */
function ocorrenciaService($resource) {

    // URL do Serviço.
    var serviceURL = "/api/ocorrencias";

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

// Registrar Ocorrencia Service.
vivendasServices.factory('ocorrenciaService', ['$resource', ocorrenciaService]);