/** Modelo de Visita. **/
'use strict';

/**
 * Método para encapsular definição da classe do modelo.
 * 
 * @param {ngService} VisitaService Serviço utilizado pelo modelo para recuperar seus dados.
 * @return {VisitaModel} Entidade de Visita.
 */
function visitaModelDefinition($q, VisitaService, AbstractModel) {

    /**
     * Construtor de Modelo.
     */
    var VisitaModel = function(model) {

        /**
         * Definição da propriedade Permanencia.
         * Definida aqui para não ser "static".
         */
        this.Permanencia = {};

        this.loadModel(model);
    };

    /**
     * Extender classe abstrata de modelo.
     */
    VisitaModel.prototype = new AbstractModel(VisitaService);

    /**
     * Sobrescrever método de instancia modelo. 
     */
    VisitaModel.prototype.getInstance = function(model) {
        return new VisitaModel(model);
    };

    /**
     * Sobrescrever método de parametros do "find".
     */
    VisitaModel.prototype.getFindParameters = function() {
        return {
            id: this.ID,
            carroID: this.CarroID,
            bloco: this.Bloco,
            apartamento: this.Apartamento,
            entrada: this.Entrada,
            saida: this.Saida,
            ativa: this.Ativa
        };
    };

    /**
     * Objeto contendo métodos de extensão do modelo.
     * Aqui vão os métodos somente necessários neste modelo atual.
     */
    var extendPrototype = {
        /**
         * Método auxiliar para criar permanências.
         * 
         * @param {Moment} entrada Moment de Entrada do Visitante.
         * @return {Object} Objeto contendo duração da permanência e duração formatada (DD:hh:mm:ss).
         */
        atualizarPermanencia: function() {
            // Calcular permanência.
            var duration = moment.duration(moment().diff(moment(this.Entrada, "DD/MM/YYYY HH:mm:ss")));
            this.Permanencia.Duracao = duration;

            // Formatar permanência.
            var days = duration.days() > 0 ? duration.days() + "d:" : "";
            var hours = duration.hours() > 0 || days != "" ? duration.hours() + "h:" : "";
            var minutes = duration.minutes() > 0 || hours != "" ? duration.minutes() + "m:" : "";
            var seconds = duration.seconds() > 0 || minutes != "" ? duration.seconds() + "s" : "";

            this.Permanencia.Formatada = days + hours + minutes + seconds;
        }
    };

    /**
     * Usar "extensão" (importar comportamento) utilizando o angular.extend.
     * Outro modo seria Model.prototype.functionName = function() { };
     * Ou Model.prototype.propertyName = property;
     */
    angular.extend(VisitaModel.prototype, extendPrototype);

    /**
     * Retornar referencia para o modelo definido.
     */
    return VisitaModel;
}

// Registrar Visita Model.
vivendasModels.factory('VisitaModel', ['$q', 'VisitaService', 'AbstractModel', visitaModelDefinition]);