/** Modelo de Pessoa. **/
'use strict';

/**
 * Método para encapsular definição da classe do modelo.
 * 
 * @param {ngService} PessoaService Serviço utilizado pelo modelo para recuperar seus dados.
 * @return {PessoaModel} Entidade de Pessoa.
 */
function pessoaModelDefinition($q, PessoaService, AbstractModel) {

    /**
     * Construtor de Modelo.
     */
    var PessoaModel = function(model) {
        this.loadModel(model);
    };

    /**
     * Extender classe abstrata de modelo.
     */
    PessoaModel.prototype = new AbstractModel(PessoaService);

    /**
     * Sobrescrever método de instancia modelo. 
     */
    PessoaModel.prototype.getInstance = function(model) {
        return new PessoaModel(model);
    };

    /**
     * Sobrescrever método de parametros do "find".
     */
    PessoaModel.prototype.getFindParameters = function() {
        return {
            id: this.ID,
            nome: this.Nome,
            bloco: this.Bloco,
            apartamento: this.Apartamento,
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
    angular.extend(PessoaModel.prototype, extendPrototype);

    /**
     * Retornar referencia para o modelo definido.
     */
    return PessoaModel;
}

// Registrar Visita Model.
vivendasModels.factory('PessoaModel', ['$q', 'PessoaService', 'AbstractModel', pessoaModelDefinition]);