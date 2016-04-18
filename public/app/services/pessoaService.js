/* Serviço de Pessoas. */
'use strict';

/**
 * Método para mapear URL e métodos do Pessoa Service.
 * 
 * @param {ngResource} $resource Gerador de Recursos do Angular.
 * @return {ngResource} Recurso gerado do Angular.
 */
function PessoaService($resource) {

    // URL do Serviço.
    var serviceURL = "/api/pessoas";

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

// Registrar PessoaService.
vivendasServices.factory('PessoaService', ['$resource', PessoaService]);