
// Directive para fazer bind de arquivo no modelo.
vivendas.directive('vsgBindFile', [function() {
    return {

        // Requer Bind de algum modelo.
        require: "ngModel",

        // Aplicar somente a atributo (?).
        restrict: 'A',

        // Função executada durante o Bind da Directive no elemento HTML
        link: function($scope, element, attributes, ngModel) {

            /**
             * $scope = controller utilizado.
             * element = elemento que recebeu a directive.
             * attributes = atributos do elemento.
             * ngModel = referencia para o modelo que foi "bindado".
             */

            // Adicionar callback ao evento de change do elemento.
            element.bind('change',
                function(event) {

                    var sizeSum = 0;
                    angular.forEach(event.target.files, function(file) {
                        sizeSum += file.size;
                    });

                    if (sizeSum < $scope.UploadMaximo) {

                        event.target.setCustomValidity("");

                        // Recuperar arquivo que foi preenchido no input file
                        // E "alimentar" dentro do modelo.
                        ngModel.$setViewValue(event.target.files);

                        // Aplicar alterações no $scope.
                        $scope.$apply();
                    }
                    else {
                        event.target.setCustomValidity("Tamanho máximo das fotos somadas não pode passar de 6 MB.");
                    }
                }
            );

            // Watch do valor do modelo para o elemento HTML.
            $scope.$watch(
                function() {
                    // Retornar valor do modelo que sera "vigiado".
                    return ngModel.$viewValue;
                },
                function(value) {
                    // Método invocado quando o valor vigiado é divergente do valor anterior (foi alterado).

                    // Se valor não existe (preenchido com vazio por exemplo)
                    if (!value) {
                        // Limpar elemento.
                        element.val("");
                    }
                }
            );
        }
    };
}]);

// Directive para fazer bind de arquivo no modelo.
vivendas.directive('vsgFormatarPlaca', ['CarroModel', function(CarroModel) {
    return {

        // Requer Bind de algum modelo.
        require: "ngModel",

        // Aplicar somente a atributo (?).
        restrict: 'A',

        // Função executada durante o Bind da Directive no elemento HTML
        link: function($scope, element, attributes, ngModel) {
            
            element.mask("SSS-0000");
            
            element.bind('change', function(event) {
                if (event.target.value.length == 8) {

                    var carro = new CarroModel({
                        Placa: event.target.value
                    });

                    carro.find().then(function(carros) {
                        if (carros.length <= 0) {
                            ngModel.$setValidity("placataken", true);
                        }
                        else {
                            ngModel.$setValidity("placataken", false);
                        }
                    });
                }
            });
        }
    };
}]);


// Directive para fazer bind de arquivo no modelo.
vivendas.directive('vsgTypeaheadPlaca', [function() {
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