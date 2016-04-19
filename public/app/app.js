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
                templateUrl: 'partials/visita/visita.html',
                controller: 'VisitaController'
            })
            .when('/visitas', {
                templateUrl: 'partials/visita/visitas.html',
                controller: 'VisitasController'
            })
            .when('/pessoa/:pessoaId', {
                templateUrl: 'partials/pessoa/pessoa.html'
            })
            .when('/pessoas', {
                templateUrl: 'partials/pessoa/pessoas.html',
                controller: 'PessoasController'
            })
            .when('/ocorrencia/:ocorrenciaId', {
                templateUrl: 'partials/ocorrencia/ocorrencia.html',
            })
            .when('/carro/:carroId', {
                templateUrl: 'partials/carro/carros.html',
                controller: 'CarrosController'
            })
            .when('/carros', {
                templateUrl: 'partials/carro/carros.html',
                controller: 'CarrosController'
            });

        // Configureção de Provider.
        // Remover modo de HTML5, que é belo, porém necessário configuração no Servidor de Aplicação.
        $locationProvider.html5Mode(false).hashPrefix('!');
    }
]);