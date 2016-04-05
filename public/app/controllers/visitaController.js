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
 * @param {Resource} visitaService Referencia para o Visita Service.
 * @param {Resource} carroService Referencia para o Carro Service.
 */
function visitaController($scope, $interval, PessoaModel, VisitaModel, CarroModel) {

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
            if (minutes >= (maxTime / 2)) {

                // Recuperar TableRow
                var $visitaTableRow = $("#visita_" + visita.ID);

                // Se permanência menor que tempo máximo.
                if (minutes < maxTime) {
                    // Alterar CSS Class para Warning.
                    $visitaTableRow.attr('class', 'warning');
                }
                // Se permanência maior que tempo máximo.
                else {
                    // Alterar CSS Class para Danger.
                    $visitaTableRow.attr('class', 'danger');
                }

            }
        }
    }, 1000);

    // Use $scope para criar variaveis de ViewScope.

    // Dados do Cadastro de Visitante.
    $scope.formVisitante = {};

    // Modelos do Controller
    $scope.Visita = new VisitaModel();
    $scope.Pessoa = new PessoaModel();
    $scope.Carro = new CarroModel();

    // Lista de Visitas ativas.
    $scope.Visitas = [];

    // Métodos do Typeahead.
    $scope.typeahead = {
        // Método chamado antes do dispatch do AJAX.
        preDispatch: function(query) {

            // Limpar modelos.
            $scope.Pessoa = new PessoaModel();
            $scope.Carro = new CarroModel();

            // Esconder painel de visualização.
            $("#pnlVisualizarPessoa").hide("slow");

            // Esconder painel de cadastaro.
            $("#pnlCadastroVisitante").hide("slow");

            // Esconder painel de visita.
            $("#pnlCadastoVisita").hide("slow");

            // Determinar query enviada para o serviço REST.
            return "placa=" + query;

        },
        // Método chamado no retorno de dados do serviço REST.
        preProcess: function(data) {
            // Verificar se placa esta completa, porém não retornou valores do serviço.
            if ($("#txtPlaca").val().length == 8 && data.length == 0) {

                // Se não retornou, deve ser uma placa nova, liberar painel de cadastro.
                $("#pnlCadastroVisitante").show("slow");
            }

            // Se há dados, retornar para o Typeahead.
            return data;
        }
    };

    // Recuperar todas visitas ativas (sem data de saida).
    // Popular entidade com as propriedades que serão usadas como parametro.
    // No caso Saida == "NULL".
    var visitaModel = new VisitaModel();
    visitaModel.Ativa = true;
    visitaModel.find().then(function(data) {

        // Não faça nada se não houver dados.
        if (data.length <= 0) return;

        // Lista de todas visitas ativas.
        for (var i = 0; i < data.length; i++) {

            // Adicionar a lista de visitas do Viewscope.
            $scope.Visitas.push(data[i]);
        }

        // Mostrar painel com visitas ativas.
        $("#pnlVisitasAtivas").show("slow");
    });

    // Método para exibir as informações de pessoa.
    $scope.exibirDadosPessoa = function() {

        // Esconder painel de cadastro de visitante.
        $("#pnlCadastroVisitante").hide("slow");

        // Verificar visibilidade da div de morador.
        if ($scope.Pessoa.Tipo == 'Morador') {
            $("#divMorador").show();
        }
        // Esconder caso não morador e mostrar painel de cadastro de visita.
        else {
            $("#divMorador").hide();
            $("#pnlCadastoVisita").show("slow");
        }

        // Mostrar painel de visualização.
        $("#pnlVisualizarPessoa").show("slow");
    };

    // Função para carregar dados da pessoa do service.
    $scope.loadPlaca = function(placa) {

        // Preencher atributo Placa
        $scope.Carro.Placa = placa;

        // Pesquisar por carro com a placa.
        $scope.Carro.find().then(function(data) {

            // Recuperar dado vindo do serviço.
            $scope.Carro = data[0];

            // Carregar pessoa cujo ID seja o PessoaID do Carro.
            $scope.Pessoa.load($scope.Carro.PessoaID).then(function(data) {
                $scope.exibirDadosPessoa();
            });
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

                // Recuperar ID da pessoa encontrada e inserir na entidade do novo carro
                $scope.Carro.PessoaID = data[0].ID;

                // Invocar save da entidade carro.
                $scope.Carro.save().then(function(data) {
                    $scope.exibirDadosPessoa();
                });
            }
            // Ninguém foi recuperado.
            else if (data.length == 0) {
                // Solicitar criação da pessoa nova.
                $scope.Pessoa.save().then(function(data) {

                    // Recuperar ID da pessoa inserida e inserir na entidade do novo carro
                    $scope.Carro.PessoaID = $scope.Pessoa.ID;

                    // Invocar save da entidade carro.
                    $scope.Carro.save().then(function(data) {
                        $scope.exibirDadosPessoa();
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

            // Salvo com sucesso, adicionar a visita a lista de visitas.
            $scope.Visitas.push($scope.Visita);

            // Criar uma nova visita como placeholder para a próxima.
            $scope.Visita = new VisitaModel();

            // Esconder painel de cadastro de visita e painel de visualização.
            $("#pnlCadastoVisita").hide("slow");
            $("#pnlVisualizarPessoa").hide("slow");

            // Mostrar painel com visitas ativas.
            $("#pnlVisitasAtivas").show("slow");
        });
    };

    // Função para registrar saida do visitante.
    $scope.saidaVisitante = function(visita) {
        // Transformar Entrada novamente em string e definir horário de saida da visita (Agora).
        visita.Saida = moment().format("DD/MM/YYYY HH:mm:ss");

        // Salvar visita com data/hora de saida.
        visita.update().then(function() {

            // Percorrer lista para remover a visita atualizada.
            for (var i = 0; i < $scope.Visitas.length; i++) {
                // Se ID no Viewscope == ID do removido.
                if ($scope.Visitas[i].ID == visita.ID) {
                    // Recuperar o TR
                    var $visitaTableRow = $("#visita_" + visita.ID);

                    // Esconder o TR.
                    $visitaTableRow.hide("slow", function() {
                        // Após concluido, remover do Viewscope
                        $scope.Visitas.splice(i, 1);

                        // Se não há mais visitas, esconder o painel de visitas ativas.
                        if ($scope.Visitas.length <= 0) {
                            $("#pnlVisitasAtivas").hide("slow");
                        }
                    });
                    break;
                }
            }
        });
    };
}

var referencedModules = [
    '$scope',
    '$interval',
    'PessoaModel',
    'VisitaModel',
    'CarroModel',
    visitaController
];

// Registrar Visita Controller
vivendasControllers.controller('visitaController', referencedModules);