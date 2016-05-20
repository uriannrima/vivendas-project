// Directive para fazer bind de arquivo no modelo.
vivendasDirectives.directive('vsgFormatarPlaca', ['CarroModel', function(CarroModel) {
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