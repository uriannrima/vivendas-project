/* Controller de Pessoas */
'use strict';


/**
 * Definição do Pessoas Controller (Controller de Listagem de Pessoas)
 * 
 * @param {ngScope} $scope ViewScope do Controller.
 * @param {PessoaModel} PessoaModel Referencia ao Modelo de Pessoa.
 * @param {CarroModel} CarroModel Referencia ao Modelo de Carro.
 */
function PessoasController($scope, PessoaModel, CarroModel) {
    // Filtro de Pessoa.
    $scope.PessoaFilter = {};

    // Lista de Pessoas.
    $scope.Pessoas = [];

    function procurarVeiculo(pessoasArray) {
        var pesquisaCarro = new CarroModel();

        angular.forEach(pessoasArray, function(pessoa) {
            pesquisaCarro.PessoaID = pessoa.ID;
            pesquisaCarro.find().then(function(data) {
                pessoa.Carro = data[0];
            });
        });

        return pessoasArray;
    }

    // Popular lista de pessoas.
    function popularLista(pessoasArray) {
        $scope.Pessoas = pessoasArray;
    }

    // Carregar lista de pessoas do serviço.
    $scope.carregarPessoas = function() {
        var pessoaModel = new PessoaModel();
        pessoaModel.find()
            .then(procurarVeiculo)
            .then(popularLista);
    };

    // Carregar no "page_load".
    $scope.carregarPessoas();
}


var referencedModules = [
    '$scope',
    'PessoaModel',
    'CarroModel',
    PessoasController
];

// Registrar Pessoa Controller
vivendasControllers.controller('PessoasController', referencedModules);