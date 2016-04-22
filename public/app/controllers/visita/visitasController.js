/* Controller de Visitas */
'use strict';


/**
 * Definição do Visitas Controller (Controller de Listagem de Visitas)
 * 
 * @param {ngScope} $scope ViewScope do Controller.
 * @param {VisitaModel} VisitaModel Referencia ao Modelo de Visita.
 */
function VisitasController($scope, VisitaModel) {
    // Filtro de Visita.
    $scope.VisitaFilter = {};

    // Lista de Visitas.
    $scope.Visitas = [];

    function calcularPermanencia(visitasArray) {
        angular.forEach(visitasArray, function(visita) {
            visita.calcularPermanencia();
        });

        return visitasArray;
    }

    // Popular lista de visitas.
    function popularLista(visitaArray) {
        $scope.Visitas = visitaArray;
    }

    // Carregar lista de visitas do serviço.
    $scope.carregarVisitas = function() {
        var visitaModel = new VisitaModel({
            Ativa: false
        });

        visitaModel.find()
            .then(calcularPermanencia)
            .then(popularLista);
    };

    // Carregar no "page_load".
    $scope.carregarVisitas();
}


var referencedModules = [
    '$scope',
    'VisitaModel',
    VisitasController
];

// Registrar Visitas Controller
vivendasControllers.controller('VisitasController', referencedModules);