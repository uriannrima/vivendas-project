/* Controller de Ocorrencias */
'use strict';


/**
 * Definição do Ocorrencias Controller (Controller de Listagem de Ocorrencias)
 * 
 * @param {ngScope} $scope ViewScope do Controller.
 * @param {VisitaModel} VisitaModel Referencia ao Modelo de Visita.
 */
function OcorrenciasController($scope, OcorrenciaModel, CarroModel, PessoaModel) {
    // Filtro de Ocorrencia.
    $scope.OcorrenciaFilter = {};

    // Lista de Ocorrencias.
    $scope.Ocorrencias = [];

    // Popular lista de Ocorrencias.
    function popularLista(ocorrenciasArray) {
        $scope.Ocorrencias = ocorrenciasArray;
    }

    // Carregar lista de Ocorrencias do serviço.
    $scope.carregarOcorrencias = function() {
        var ocorrenciaModel = new OcorrenciaModel();
        ocorrenciaModel.find()
            .then(popularLista);
    };

    // Carregar no "page_load".
    $scope.carregarOcorrencias();
}


var referencedModules = [
    '$scope',
    'OcorrenciaModel',
    'CarroModel',
    'PessoaModel',
    OcorrenciasController
];

// Registrar Ocorrencias Controller
vivendasControllers.controller('OcorrenciasController', referencedModules);