/** Modelo de Carro. **/
'use strict';

/**
 * Método para encapsular definição da classe do modelo.
 * 
 * @param {ngService} CarroService Serviço utilizado pelo modelo para recuperar seus dados.
 * @return {CarroModel} Entidade de Carro.
 */
function carroModelDefinition($q, CarroService, AbstractModel) {

    /**
     * Construtor de Modelo.
     */
    var CarroModel = function(model) {
        this.loadModel(model);
    };

    /**
     * Extender classe abstrata de modelo.
     */
    CarroModel.prototype = new AbstractModel(CarroService);

    /**
     * Sobrescrever método de instancia modelo. 
     */
    CarroModel.prototype.getInstance = function(model) {
        return new CarroModel(model);
    };

    /**
     * Sobrescrever método de parametros do "find".
     */
    CarroModel.prototype.getFindParameters = function() {
        return {
            id: this.ID,
            placa: this.Placa,
            pessoaID: this.PessoaID,
            modelo: this.Modelo,
            cor: this.Cor
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
    angular.extend(CarroModel.prototype, extendPrototype);

    /**
     * Retornar referencia para o modelo definido.
     */
    return CarroModel;
}

// Registrar Modelo.
vivendasModels.factory('CarroModel', ['$q', 'CarroService', 'AbstractModel', carroModelDefinition]);