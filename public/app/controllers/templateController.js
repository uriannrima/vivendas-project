/* Template de Controller */
'use strict';

// Definição do Controller (Controller de Entrada/Saida de Veiculos)
function ControllerDefinition($scope, $http, $interval) {
    $scope.message = "Teste";
}

// Registrar Controller.
appModule.controller('ControllerDefinition', ['$scope', '$http', '$interval', ControllerDefinition]);