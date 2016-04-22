// Directive para fazer bind de arquivo no modelo.
function vsgBindFileDefinition() {
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
}

vivendasDirectives.directive('vsgBindFile', [vsgBindFileDefinition]);