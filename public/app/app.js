/* Modulo da Application. */
'use strict';

// Tempo máximo de permanência no condominio.
var maxTime = 2;
var maxUploadSize = 6 * 1024 * 1024;

// Criar aplicação.
var vivendas = angular.module('vivendas', ['ngRoute', 'ngFileUpload', 'vivendasControllers', 'vivendasServices', 'vivendasModels']);

// Configurações da aplicação.
vivendas.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        // Configuração de Rota (URL e Controller)
        // Atenção: Se controller estiver definido aqui, não é necessário ng-controller na pagina em questão.
        // Ou ira ocorrer duas vezes inicialização do mesmo controller.
        $routeProvider
            .when('/', {
                templateUrl: 'partials/visita.html',
                controller: 'visitaController'
            })
            .when('/pessoa', {
                templateUrl: 'partials/pessoa.html',
                controller: 'pessoaController'
            })
            .when('/ocorrencia', {
                templateUrl: 'partials/ocorrencia.html',
                //controller: 'pessoaController'
            });

        // Configureção de Provider.
        // Remover modo de HTML5, que é belo, porém necessário configuração no Servidor de Aplicação.
        $locationProvider.html5Mode(false).hashPrefix('!');
    }
]);

// Directive para fazer bind de arquivo no modelo.
vivendas.directive('bindFile', [function() {
    return {

        // Requer Bind de algum modelo.
        require: "ngModel",

        // Aplicar somente a atributo (?).
        restrict: 'A',

        // Função executada durante o Bind da Directive no elemento HTML
        link: function($scope, element, attributes, ngModel) {

            /**
             * $scope = controller utilizado.
             * element = elemento que recebeu a directive.
             * attributes = atributos do elemento.
             * ngModel = referencia para o modelo que foi "bindado".
             */

            // Adicionar callback ao evento de change do elemento.
            element.bind('change',
                function(event) {

                    var sizeSum = 0;
                    angular.forEach(event.target.files, function(file) {
                        sizeSum += file.size;
                    });

                    if (sizeSum < maxUploadSize) {
                        
                        event.target.setCustomValidity("");

                        // Recuperar arquivo que foi preenchido no input file
                        // E "alimentar" dentro do modelo.
                        ngModel.$setViewValue(event.target.files);

                        // Aplicar alterações no $scope.
                        $scope.$apply();
                    } else {
                        event.target.setCustomValidity("Tamanho máximo das fotos somadas não pode passar de 6 MB.");
                    }
                }
            );

            // Watch do valor do modelo para o elemento HTML.
            $scope.$watch(
                function() {
                    // Retornar valor do modelo que sera "vigiado".
                    return ngModel.$viewValue;
                },
                function(value) {
                    // Método invocado quando o valor vigiado é divergente do valor anterior (foi alterado).

                    // Se valor não existe (preenchido com vazio por exemplo)
                    if (!value) {
                        // Limpar elemento.
                        element.val("");
                    }
                }
            );
        }
    };
}]);