/* Serviço de Carros. */
'use strict';

/**
 * Método para mapear URL e métodos do Carro Service.
 * 
 * @param {ngResource} $resource Gerador de Recursos do Angular.
 * @return {ngResource} Recurso gerado do Angular.
 */
function CarroService($resource) {

    // URL do Serviço.
    var serviceURL = "/api/carros";

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
        }
    };

    // Criar recurso.
    return $resource(serviceURL, {}, serviceMethods);
}

// Registrar Carro Service.
vivendasServices.factory('CarroService', ['$resource', CarroService]);