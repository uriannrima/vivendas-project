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

    function popularPessoa(ocorrenciasArray) {
        angular.forEach(ocorrenciasArray, function(ocorrencia) {
            // Carregar dados do Carro da Ocorrência.
            var carro = new CarroModel();
            carro.load(ocorrencia.CarroID).then(function() {
                // Popular ocorrencia com o carro.
                ocorrencia.Carro = carro;
                
                // Carregar dados da Pessoa da Ocorrência
                var pessoa = new PessoaModel();
                pessoa.load(carro.PessoaID).then(function() {
                    // Popular ocorrência com a pessoa.
                    ocorrencia.Pessoa = pessoa;
                });
            });
        });
        return ocorrenciasArray;
    }

    // Popular lista de Ocorrencias.
    function popularLista(ocorrenciasArray) {
        $scope.Ocorrencias = ocorrenciasArray;
    }

    // Carregar lista de Ocorrencias do serviço.
    $scope.carregarOcorrencias = function() {
        var ocorrenciaModel = new OcorrenciaModel();
        ocorrenciaModel.find()
            .then(popularPessoa)
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