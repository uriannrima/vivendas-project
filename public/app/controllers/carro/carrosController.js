/* Controller de Carros */
'use strict';


/**
 * Definição do Carros Controller (Controller de Listagem de Carros)
 * 
 * @param {ngScope} $scope ViewScope do Controller.
 * @param {CarroModel} CarroModel Referencia ao Modelo de Carro.
 */
function CarrosController($scope, CarroModel) {
    // Filtro de Visita.
    $scope.CarroFilter = {};

    // Lista de Carros.
    $scope.Carros = [];

    // Popular lista de Carros.
    function popularLista(carroArray) {
        $scope.Carros = carroArray;
    }

    // Carregar lista de Carros do serviço.
    $scope.carregarCarros = function() {
        var carroModel = new CarroModel();
        carroModel.find().then(popularLista);
    };

    // Carregar no "page_load".
    $scope.carregarCarros();
}


var referencedModules = [
    '$scope',
    'CarroModel',
    CarrosController
];

// Registrar Carros Controller
vivendasControllers.controller('CarrosController', referencedModules);