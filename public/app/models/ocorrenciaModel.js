/** Modelo de Ocorrência. **/
'use strict';

/**
 * Método para encapsular definição da classe do modelo.
 * 
 * @param {ngService} PessoaService Serviço utilizado pelo modelo para recuperar seus dados.
 * @return {OcorrenciaModel} Entidade de Ocorrência.
 */
function ocorrenciaModelDefinition($q, OcorrenciaService, AbstractModel) {

    /**
     * Construtor de Modelo.
     */
    var OcorrenciaModel = function(model) {
        this.loadModel(model);
    };

    /**
     * Extender classe abstrata de modelo.
     */
    OcorrenciaModel.prototype = new AbstractModel(OcorrenciaService);

    /**
     * Sobrescrever método de instancia modelo. 
     */
    OcorrenciaModel.prototype.getInstance = function(model) {
        return new OcorrenciaModel(model);
    };

    /**
     * Sobrescrever método de parametros do "find".
     */
    OcorrenciaModel.prototype.getFindParameters = function() {
        return {
            id: this.ID,
            carroID: this.CarroID,
            bloco: this.Bloco,
            apartamento: this.Apartamento,
            data: this.Data
        };
    };

    /**
     * Objeto contendo métodos de extensão do modelo.
     * Aqui vão os métodos somente necessários neste modelo atual.
     */
    var extendPrototype = {};

    /**
     * Usar "extensão" (importar comportamento) utilizando o angular.extend.
     * Outro modo seria Model.prototype.functionName = function() { };
     * Ou Model.prototype.propertyName = property;
     */
    angular.extend(OcorrenciaModel.prototype, extendPrototype);

    /**
     * Retornar referencia para o modelo definido.
     */
    return OcorrenciaModel;
}

// Registrar Ocorrencia Model.
vivendasModels.factory('OcorrenciaModel', ['$q', 'OcorrenciaService', 'AbstractModel', ocorrenciaModelDefinition]);