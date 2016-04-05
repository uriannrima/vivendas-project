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
function ocorrenciaController($scope, PessoaModel, CarroModel, OcorrenciaModel, FotoModel) {

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

            // Esconder painel de visualização.
            $("#pnlOcorrenciaVisualizarPessoa").hide("slow");

            // Esconder painel de visualização.
            $("#pnlCadastoOcorrencia").hide("slow");

            // Determinar query enviada para o serviço REST.
            return "placa=" + query;

        },
        // Método chamado no retorno de dados do serviço REST.
        preProcess: function(data) {
            // Se há dados, retornar para o Typeahead.
            return data;
        }
    };

    // Método para exibir as informações de pessoa.
    $scope.exibirDadosPessoa = function() {

        // Verificar visibilidade da div de morador.
        if ($scope.Pessoa.Tipo == 'Morador') {
            $("#divOcorrenciaMorador").show();
        }
        // Esconder caso não morador e mostrar painel de cadastro de visita.
        else {
            $("#divOcorrenciaMorador").hide();
        }

        // Mostrar painel de visualização.
        $("#pnlOcorrenciaVisualizarPessoa").show("slow");
        $("#pnlCadastoOcorrencia").show("slow");
        $("#pnlDescricao").show("slow");
    };

    $scope.esconderDadosPessoa = function() {
        $("#pnlPesquisaPlacaOcorrencia").hide("slow");
        $("#divOcorrenciaMorador").hide("slow");
        $("#pnlOcorrenciaVisualizarPessoa").hide("slow");
        $("#pnlCadastoOcorrencia").hide("slow");
        $("#pnlDescricao").hide("slow");
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

                $scope.exibirDadosPessoa();
            });
        });
    };

    // Criar registro de ocorrência.
    $scope.registrarOcorrencia = function() {

        // Fotos sendo enviadas
        $scope.FotosUploading = [];

        // Salvar a ocorrência
        $scope.Ocorrencia.save().then(function(model) {

            // Esconder paineis de dados das pessoas.
            $scope.esconderDadosPessoa();

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
                                var $ocorrenciaModal = $('#ocorrenciaModal');

                                if ($ocorrenciaModal) {

                                    // Limpar variaveis do modelo.
                                    $scope.Ocorrencia = new OcorrenciaModel();
                                    $scope.Pessoa = new PessoaModel();
                                    $scope.Carro = new CarroModel();

                                    // Fechar modal.
                                    $ocorrenciaModal.modal('hide');

                                    // Remover painel de upload.
                                    $("#pnlUploadsAtivos").hide("slow");

                                    // Reativar painel de pesquisa de placa.
                                    $("#pnlPesquisaPlacaOcorrencia").show("slow");
                                }
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

            // Mostrar painel de upload de fotos.
            if ($scope.FotosUploading.length != 0) {
                // Mostar painel de upload.
                $("#pnlUploadsAtivos").show("slow");
            }
        });
    };

}

var referencedModules = [
    '$scope',
    'PessoaModel',
    'CarroModel',
    'OcorrenciaModel',
    'FotoModel',
    ocorrenciaController
];

// Registrar Pessoa Controller
vivendasControllers.controller('ocorrenciaController', referencedModules);