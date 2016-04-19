/* Controller de Pessoa (CRUD) */
'use strict';


/**
 * Definição do Pessoa Controller (Controller de Cadastro de Pessoas)
 * 
 * @param {ngScope} $scope ViewScope do Controller.
 * @param {ngHttp} $http Wrapper HTTP utilizado para requests.
 */
function IndexController($scope, $rootScope) {
    $rootScope.Mensagens = [];
    
    $rootScope.TempoMaximo = 20;
    $rootScope.UploadMaximo = 6 * 1024 * 1024;

    $rootScope.adicionarMensagem = function(texto, tipo, strong) {

        var alertClass = "info";

        if (tipo.length == 1) {
            alertClass = tipo == "D" ? "danger" : tipo == "W" ? "warning" : tipo == "I" ? "info" : "success";
        }
        else if (tipo == 'danger' || tipo == 'warning' || tipo == 'info' || tipo == 'success') {
            alertClass = tipo;
        }

        $rootScope.Mensagens.push({
            Strong: strong,
            Texto: texto,
            Tipo: alertClass
        });
    };

    $rootScope.removerMensagem = function(index) {
        $rootScope.Mensagens.splice(index, 1);
    };
}

var referencedModules = [
    '$scope',
    '$rootScope',
    IndexController
];

// Registrar Pessoa Controller
vivendasControllers.controller('IndexController', referencedModules);