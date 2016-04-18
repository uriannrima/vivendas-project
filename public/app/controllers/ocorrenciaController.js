/* Controller de Ocorrencia (CRUD) */
'use strict';

// Variaveis globais para evitar erros no Cloud9.
/*global $ vivendasControllers*/

/**
 * Definição do Ocorrencia Controller (Controller de Cadastro de Ocorrencias)
 * 
 * @param {ngScope} $scope ViewScope do Controller.
 * @param {ngHttp} $http Wrapper HTTP utilizado para requests.
 */
function OcorrenciaController($scope, PessoaModel, CarroModel, OcorrenciaModel, FotoModel) {

    $scope.Ocorrencia = new OcorrenciaModel();
    $scope.Pessoa = new PessoaModel();
    $scope.Carro = new CarroModel();

    // Métodos do Typeahead.
    $scope.typeahead = {
        // Método chamado antes do dispatch do AJAX.
        preDispatch: function(query) {

            // Limpar modelos.
            $scope.Pessoa = new PessoaModel();
            $scope.Carro = new CarroModel();

            // Determinar query enviada para o serviço REST.
            return "placa=" + query;

        },
        // Método chamado no retorno de dados do serviço REST.
        preProcess: function(data) {
            // Se há dados, retornar para o Typeahead.
            return data;
        }
    };

    $scope.loadPlaca = function(placa) {
        // Preencher atributo Placa
        $scope.Carro.Placa = placa;

        // Pesquisar por carro com a placa.
        $scope.Carro.find().then(function(data) {

            // Recuperar dado vindo do serviço.
            $scope.Carro = data[0];

            // Carregar pessoa cujo ID seja o PessoaID do Carro.
            $scope.Pessoa.load($scope.Carro.PessoaID).then(function(data) {

                if ($scope.Pessoa.Tipo == "Morador") {
                    $scope.Ocorrencia.Bloco = $scope.Pessoa.Bloco;
                    $scope.Ocorrencia.Apartamento = $scope.Pessoa.Apartamento;
                }
                else {
                    $scope.Ocorrencia.Bloco = null;
                    $scope.Ocorrencia.Apartamento = null;
                }

                $scope.Ocorrencia.CarroID = $scope.Carro.ID;
                $scope.Ocorrencia.Data = moment().format("DD/MM/YYYY HH:mm:ss");
            });
        });
    };

    // Criar registro de ocorrência.
    $scope.registrarOcorrencia = function() {

        // Fotos sendo enviadas
        $scope.FotosUploading = [];

        // Salvar a ocorrência
        $scope.Ocorrencia.save().then(function(model) {

            // Limpar variaveis do modelo.
            $scope.Pessoa = new PessoaModel();
            $scope.Carro = new CarroModel();

            // Para cada arquivo de foto na Ocorrência.
            angular.forEach(
                $scope.Ocorrencia.Arquivos,
                function(file) {
                    // Gerar um modelo.
                    var fotoModel = new FotoModel();

                    // Definir ID da Ocorrência.
                    fotoModel.OcorrenciaID = $scope.Ocorrencia.ID;

                    // Adicionar o arquivo.
                    fotoModel.Arquivo = file;

                    // Adicionar a lista de upload.
                    $scope.FotosUploading.push(fotoModel);

                    // Invocar save.
                    fotoModel.save().then(
                        function sucess(response) {

                            fotoModel.Status = "Enviado";

                            // Remover foto da lista de upload.
                            $scope.FotosUploading.splice($scope.FotosUploading.indexOf(fotoModel), 1);

                            // Após remoção, se a lista esta vazia, todas foram enviadas.
                            if ($scope.FotosUploading.length == 0) {

                                //Fechar modal se houver
                                tryGetElement('#ocorrenciaModal', function($ocorrenciaModal) {
                                    // Fechar modal.
                                    $ocorrenciaModal.modal('hide');
                                });
                            }
                        },
                        function error(response) {
                            // Foto teve erro no upload.
                            fotoModel.Status = "Erro";
                        },
                        function progress(event) {
                            // Atualizar progresso do modelo da foto.
                            fotoModel.Progresso = Math.min(100, parseInt(100.0 * event.loaded / event.total));
                        }
                    );
                }
            );

            $scope.Ocorrencia = new OcorrenciaModel();
        });
    };
}

var referencedModules = [
    '$scope',
    'PessoaModel',
    'CarroModel',
    'OcorrenciaModel',
    'FotoModel',
    OcorrenciaController
];

// Registrar Pessoa Controller
vivendasControllers.controller('OcorrenciaController', referencedModules);