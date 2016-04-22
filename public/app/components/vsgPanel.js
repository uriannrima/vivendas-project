// Componente de Painel padrão da aplicação.
function vsgPanelDefinition() {
    var directive = {};

    directive.restrict = 'E';
    directive.scope = {
        titulo: '@',
        lista: '&'
    };
    directive.transclude = true;
    directive.templateUrl = "app/components/vsgPanel.html";

    return directive;
}

vivendasDirectives.directive('vsgPanel', [vsgPanelDefinition]);