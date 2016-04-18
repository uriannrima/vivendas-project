/* Serviço de Visitas. */
'use strict';

/**
 * Método para mapear URL e métodos do Visita Service.
 * 
 * @param {ngResource} $resource Gerador de Recursos do Angular.
 * @return {ngResource} Recurso gerado do Angular.
 */
function VisitaService($resource) {

    // URL do Serviço.
    var serviceURL = "/api/visitas";

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
        }
    };

    // Criar recurso.
    return $resource(serviceURL, {}, serviceMethods);
}

// Registrar VisitaService.
vivendasServices.factory('VisitaService', ['$resource', VisitaService]);