/* Controller de Pessoa (CRUD) */
'use strict';


/**
 * Definição do Pessoa Controller (Controller de Cadastro de Pessoas)
 * 
 * @param {ngScope} $scope ViewScope do Controller.
 * @param {ngHttp} $http Wrapper HTTP utilizado para requests.
 */
function indexController($scope, $rootScope) {
    $rootScope.Mensagens = [];

    $rootScope.adicionarMensagem = function(strong, texto) {
        $rootScope.Mensagens.push({
            Strong: strong,
            Texto: texto
        });
    };

    $rootScope.removerMensagem = function(index) {
        $rootScope.Mensagens.splice(index, 1);
    };
}

var referencedModules = [
    '$scope',
    '$rootScope',
    indexController
];

// Registrar Pessoa Controller
vivendasControllers.controller('indexController', referencedModules);