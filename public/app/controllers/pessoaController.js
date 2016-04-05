/* Controller de Pessoa (CRUD) */
'use strict';


/**
 * Definição do Pessoa Controller (Controller de Cadastro de Pessoas)
 * 
 * @param {ngScope} $scope ViewScope do Controller.
 * @param {ngHttp} $http Wrapper HTTP utilizado para requests.
 */
function pessoaController($scope, $http, carroService) {

    

    $scope.message = "Teste de Mensagem...";
}

// Registrar Pessoa Controller
vivendasControllers.controller('pessoaController', ['$scope', '$http', 'carroService', pessoaController]);