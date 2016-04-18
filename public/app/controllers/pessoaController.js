/* Controller de Pessoa (CRUD) */
'use strict';


/**
 * Definição do Pessoa Controller (Controller de Cadastro de Pessoas)
 * 
 * @param {ngScope} $scope ViewScope do Controller.
 * @param {ngScope} $rootScope ViewScope da "Aplicação".
 * @param {PessoaModel} PessoaModel Referencia ao Modelo de Pessoa.
 */
function PessoaController($scope, $rootScope, $routeParams, $location, PessoaModel, CarroModel) {

    // Modelo para manter dados da pessoa.
    $scope.Pessoa = new PessoaModel();
    $scope.Carro = new CarroModel();

    // Definir tipo de pessoa default "morador".
    $scope.Pessoa.Tipo = 'Morador';

    $scope.isModal = function() {
        var $pessoaModal = $('#pessoaModal');
        if ($pessoaModal) return $pessoaModal.is(':visible');
        return false;
    };

    // Método invocado quando pessoa salva com sucesso.
    function salvoComSucesso() {

        // Adicionar mensagem de sucesso.
        $rootScope.adicionarMensagem("Ação feita com sucesso.", "S");

        // Resetar modelo de Pessoa para o próximo cadastro.
        $scope.Pessoa = new PessoaModel();
        $scope.Carro = new CarroModel();

        //Fechar modal se houver
        tryGetElement('#pessoaModal', function($pessoaModal){
             $pessoaModal.modal('hide');
        });

        // Solicitar refresh de pessoas da lista.
        //var $divPessoas = $('#divPessoas');
        //if ($divPessoas && $divPessoas.scope()) $divPessoas.scope().carregarPessoas();

        tryGetScope('#divPessoas', function($scope) {
            $scope.carregarPessoas();
        });

        $location.path('/pessoas').replace();
    }

    // Alterar tipo da pessoa.
    $scope.toggleTipo = function(tipo) {
        $scope.Pessoa.Tipo = tipo;
        if (tipo == 'Visitante') {
            $scope.Pessoa.Bloco = null;
            $scope.Pessoa.Apartamento = null;
        }
    };

    // Salvar pessoa.
    $scope.salvarPessoa = function() {

        if ($scope.Pessoa.ID) {
            $scope.Pessoa.update().then(salvoComSucesso);
        }
        else {

            // Pesquisar se já existe alguém com este nome.
            var pesquisarPorPlaca = new CarroModel({
                Placa: $scope.Carro.Placa
            });

            // Invocar pesquisa.
            pesquisarPorPlaca.find().then(
                function(data) {
                    // Se data != vazio, placa já existe.
                    if (data.length != 0) {
                        // Adicionar mensagem de sucesso.
                        $scope.pessoaForm.placa.$setValidity("placataken", false);
                    }
                    else {
                        $scope.pessoaForm.placa.$setValidity("placataken", true);
                        $scope.Pessoa.save().then(function(){
                            $scope.Carro.PessoaID = $scope.Pessoa.ID;
                            $scope.Carro.save().then(salvoComSucesso);
                        });
                    }
                }
            );
        }
    };

    if ($routeParams.pessoaId) {
        $scope.Pessoa.load($routeParams.pessoaId);
        //$scope.PreviousPessoa = JSON.parse(JSON.stringify($scope.Pessoa));
    }

    $scope.excluirPessoa = function() {
        if ($scope.Pessoa.ID) {
            $scope.Pessoa.delete().then(salvoComSucesso);
        }
    };
}



var referencedModules = [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$location',
    'PessoaModel',
    'CarroModel',
    PessoaController
];

// Registrar Pessoa Controller
vivendasControllers.controller('PessoaController', referencedModules);