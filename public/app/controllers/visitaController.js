/* Controller de Visita (Entrada e Saida) de Veiculos. */
'use strict';

// Variaveis globais para evitar erros no Cloud9.
/*global moment $ vivendasControllers maxTime */

/**
 * Definição do Visita Controller (Controller de Entrada/Saida de Veiculos).
 * 
 * @param {ngScope} $scope ViewScope do Controller.
 * @param {ngHttp} $http Wrapper HTTP utilizado para requests.
 * @param {ngInterval} $interval Wrapper do setInterval.
 * @param {Resource} VisitaService Referencia para o Visita Service.
 * @param {Resource} CarroService Referencia para o Carro Service.
 */
function VisitaController($scope, $rootScope, $interval, PessoaModel, VisitaModel, CarroModel, OcorrenciaModel) {

    // Atualizar tempo dos visitantes a cada 1 segundo.
    $interval(function() {

        // Não fazer nada do processo caso não haja visitas a tratar.
        if ($scope.Visitas.length <= 0) return;

        for (var i = 0; i < $scope.Visitas.length; i++) {
            var visita = $scope.Visitas[i];

            // Atualizar permanência.
            visita.atualizarPermanencia();

            // Recuperar minutos para mudança do "class".
            var minutes = visita.Permanencia.Duracao.asMinutes();

            // Se duração maior que tempo médio.
            if (minutes >= ($rootScope.TempoMaximo / 2)) {

                // Recuperar TableRow
                var $visitaTableRow = $("#visita_" + visita.ID);

                // Se permanência menor que tempo máximo.
                if (minutes < $rootScope.TempoMaximo) {
                    // Alterar CSS Class para Warning.
                    $visitaTableRow.attr('class', 'warning');
                }
                // Se permanência maior que tempo máximo.
                else {
                    // Alterar CSS Class para Danger.
                    $visitaTableRow.attr('class', 'danger');
                    if (!visita.PossuiOcorrencia) {
                        var ocorrencia = new OcorrenciaModel({
                            Descricao: "Visitante ficou mais de " + $rootScope.TempoMaximo + " minutos no condominio.",
                            CarroID: visita.CarroID,
                            Bloco: visita.Bloco,
                            Apartamento: visita.Apartamento,
                            Data: moment().format("DD/MM/YYYY HH:mm:ss")
                        });
                        // ocorrencia.save().then(function() {
                        //     visita.PossuiOcorrencia = true;
                        // });
                    }
                }

            }
        }
    }, 1000);

    // Use $scope para criar variaveis de ViewScope.

    // Dados do Cadastro de Visitante.
    $scope.formVisitante = {};
    $scope.Autocomplete = false;

    // Modelos do Controller
    $scope.Visita = new VisitaModel();
    $scope.Pessoa = new PessoaModel();
    $scope.Carro = new CarroModel();

    // Lista de Visitas ativas.
    $scope.Visitas = [];

    // Métodos do Typeahead.
    $scope.typeahead = {
        // Metodo chamado quando algum item é selecionado.
        // Retorno é colocado dentro do InputText.
        updater: function(item) {
            var placa = item.substring(0, 8);
            $scope.loadPlaca(placa);
            return placa;
        },

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

            // Verificar se auto complete ativo (com dados).
            $scope.Autocomplete = (data.length > 0);

            // Se há dados, retornar para o Typeahead.
            return data;
        }
    };

    // Recuperar todas visitas ativas (sem data de saida).
    // Popular entidade com as propriedades que serão usadas como parametro.
    // No caso Saida == "NULL".
    var pesquisaVisitasAtivas = new VisitaModel();
    pesquisaVisitasAtivas.Ativa = true;

    pesquisaVisitasAtivas.find().then(function(data) {

        // Não faça nada se não houver dados.
        if (data.length <= 0) return;

        // Lista de todas visitas ativas.
        for (var i = 0; i < data.length; i++) {

            var pesquisarOcorrencia = new OcorrenciaModel();
            angular.forEach(data, function(visita) {
                pesquisarOcorrencia.VisitaI
            });

            // Adicionar a lista de visitas do Viewscope.
            $scope.Visitas.push(data[i]);
        }
    });

    // Função para carregar dados da pessoa do service.
    $scope.loadPlaca = function(placa) {

        // Preencher atributo Placa
        $scope.Carro.Placa = placa;

        // Pesquisar por carro com a placa.
        $scope.Carro.find().then(function(data) {

            // Recuperar dado vindo do serviço.
            $scope.Carro = data[0];

            // Carregar pessoa cujo ID seja o PessoaID do Carro.
            $scope.Pessoa.load($scope.Carro.PessoaID);
        });
    };

    // Função para registro de visitante.
    $scope.registarVisitante = function() {

        // Pesquisar por pessoa com o Nome.
        $scope.Pessoa.find().then(function(data) {

            // Preencher todas informações necessárias para inclusão.
            $scope.Carro.Placa = $scope.Placa;

            // Alguém foi recuperado
            if (data.length == 1) {

                // Informar que visitante já existia.
                $rootScope.adicionarMensagem("Visitante " + $scope.Pessoa.Nome + " já existia e veiculo será associado a ele.", "I");

                // Recuperar ID da pessoa encontrada e inserir na entidade do novo carro
                $scope.Carro.PessoaID = $scope.Pessoa.ID;

                // Invocar save da entidade carro.
                $scope.Carro.save().then(function() {
                    $rootScope.adicionarMensagem("Visitante registrado com sucesso.", "S");
                });
            }
            // Ninguém foi recuperado.
            else if (data.length == 0) {
                // Solicitar criação da pessoa nova.
                $scope.Pessoa.save().then(function(data) {
                    // Informar que visitante não existia.
                    $rootScope.adicionarMensagem("Visitante " + $scope.Pessoa.Nome + " não existia e foi registrado com sucesso.", "I");

                    // Recuperar ID da pessoa inserida e inserir na entidade do novo carro
                    $scope.Carro.PessoaID = data[0].ID;

                    // Invocar save da entidade carro.
                    $scope.Carro.save().then(function() {
                        $rootScope.adicionarMensagem("Visitante registrado com sucesso.", "S");
                    });
                });
            }
        });
    };

    // Função para registro de entrada de visitante.
    $scope.entradaVisitante = function() {

        // Completar visita com horário de entrada (Agora).
        $scope.Visita.Entrada = moment().format("DD/MM/YYYY HH:mm:ss");

        // Definir carro visitante da visita como carro atual do escopo.
        $scope.Visita.CarroID = $scope.Carro.ID;

        // Invocar save da entidade visita.
        $scope.Visita.save().then(function(data) {

            $rootScope.adicionarMensagem("Visita registrada com sucesso.", "S");

            // Salvo com sucesso, adicionar a visita a lista de visitas.
            $scope.Visitas.push($scope.Visita);

            // Resetar valor da placa
            $scope.Placa = "";

            // Resetar variaveis dos modelos para usar como placeholder para o proximo.
            $scope.Visita = new VisitaModel();
            $scope.Pessoa = new PessoaModel();
            $scope.Carro = new CarroModel();
        });
    };

    // Função para registrar saida do visitante.
    $scope.saidaVisitante = function(index, visita) {
        // Transformar Entrada novamente em string e definir horário de saida da visita (Agora).
        visita.Saida = moment().format("DD/MM/YYYY HH:mm:ss");

        // Salvar visita com data/hora de saida.
        visita.update().then(function() {

            $rootScope.adicionarMensagem("Saida registrada com sucesso.", "S");

            // Recuperar o TR
            var $visitaTableRow = $("#visita_" + visita.ID);

            // Esconder o TR.
            $visitaTableRow.hide("slow", function() {
                // Após concluido, remover do Viewscope
                $scope.Visitas.splice(index, 1);
            });
        });
    };
}

var referencedModules = [
    '$scope',
    '$rootScope',
    '$interval',
    'PessoaModel',
    'VisitaModel',
    'CarroModel',
    'OcorrenciaModel',
    VisitaController
];

// Registrar Visita Controller
vivendasControllers.controller('VisitaController', referencedModules);