// Directive para fazer bind de arquivo no modelo.
vivendasDirectives.directive('vsgTypeaheadPlaca', [function() {
    return {
        // Aplicar somente a atributo (?).
        restrict: 'A',

        // Função executada durante o Bind da Directive no elemento HTML
        link: function($scope, element, attributes) {
            // Typeahead configuration.
            var configuration = {};

            // Metodo chamado quando algum item é selecionado.
            // Retorno é colocado dentro do InputText.
            if ($scope.typeahead && $scope.typeahead.updater) {
                configuration.updater = $scope.typeahead.updater;
            }

            // Configuração do AJAX do Typeahead
            configuration.ajax = {
                url: "/api/placas",
                displayField: "displayField",
                triggerLength: 3,
                method: "get",
                // Método chamado antes do dispatch do AJAX.
                preDispatch: function(query) {
                    if ($scope.typeahead && $scope.typeahead.preDispatch) {
                        return $scope.typeahead.preDispatch(query);
                    }
                    else {
                        return query;
                    }
                },
                // Método chamado no retorno de dados do serviço REST.
                preProcess: function(data) {
                    if ($scope.typeahead && $scope.typeahead.preProcess) {
                        return $scope.typeahead.preProcess(data);
                    }
                    else {
                        return data;
                    }
                }
            };

            // Configurar o typeahead.
            element.typeahead(configuration);
        }
    };
}]);