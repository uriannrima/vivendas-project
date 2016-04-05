/* Template de Controller */
'use strict';

// Definição do Visita Controller (Controller de Entrada/Saida de Veiculos)
function controllerDefinition($scope, $http, $interval) {
    $scope.message = "Teste";
}

// Registrar Controller.
appModule.controller('controllerDefinition', ['$scope', '$http', '$interval', controllerDefinition]);