/* Modulo da Application. */
'use strict';

function tryGetElement(query, callback) {
    var $element = $(query);
    if ($element) {
        return callback($element);
    }

    return null;
}

function tryGetScope(query, callback) {
    tryGetElement(query, function($element) {
        if ($element.scope()) {
            return callback($element.scope());
        }
    });

    return null;
}

// Criar aplicação.
var vivendas = angular.module('vivendas', ['ngRoute', 'ngFileUpload', 'ngMessages', 'vivendasControllers', 'vivendasServices', 'vivendasModels']);

// Configurações da aplicação.
vivendas.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        // Configuração de Rota (URL e Controller)
        // Atenção: Se controller estiver definido aqui, não é necessário ng-controller na pagina em questão.
        // Ou ira ocorrer duas vezes inicialização do mesmo controller.
        $routeProvider
            .when('/', {
                templateUrl: 'partials/visita.html',
                controller: 'VisitaController'
            })
            .when('/pessoa', {
                templateUrl: 'partials/pessoa.html'
            })
            .when('/ocorrencia', {
                templateUrl: 'partials/ocorrencia.html',
            })
            .when('/pessoas', {
                templateUrl: 'partials/pessoas.html',
                controller: 'PessoasController'
            })
            .when('/visitas', {
                templateUrl: 'partials/visitas.html',
                controller: 'VisitasController'
            });

        // Configureção de Provider.
        // Remover modo de HTML5, que é belo, porém necessário configuração no Servidor de Aplicação.
        $locationProvider.html5Mode(false).hashPrefix('!');
    }
]);