/** Modelo de Foto. **/
'use strict';

/**
 * Método para encapsular definição da classe do modelo.
 * 
 * @param {ngService} PessoaService Serviço utilizado pelo modelo para recuperar seus dados.
 * @return {OcorrenciaModel} Entidade de Ocorrência.
 */
function fotoModelDefinition($q, Upload, FotoService, AbstractModel) {

    /**
     * Construtor de Modelo.
     */
    var FotoModel = function(model) {
        this.loadModel(model);
    };

    /**
     * Extender classe abstrata de modelo.
     */
    FotoModel.prototype = new AbstractModel(FotoService);

    /**
     * Sobrescrever método de instancia modelo. 
     */
    FotoModel.prototype.getInstance = function(model) {
        return new FotoModel(model);
    };

    /**
     * Sobrescrever método de parametros do "find".
     */
    FotoModel.prototype.getFindParameters = function() {
        return {
            id: this.ID,
            ocorrenciaID: this.OcorrenciaID
        };
    };

    /**
     * Sobrescrever método de save para utilizar ngUpload.
     */
    FotoModel.prototype.save = function() {
        var uploadData = {
            method: 'POST', // OR PUT
            url: '/api/fotos',
            data: {
                model: {
                    'ocorrenciaID': this.OcorrenciaID
                }
            },
            file: this.Arquivo
        };

        // Invocar upload passando os dados criados.
        return Upload.upload(uploadData);
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
    angular.extend(FotoModel.prototype, extendPrototype);

    /**
     * Retornar referencia para o modelo definido.
     */
    return FotoModel;
}

// Registrar Ocorrencia Model.
vivendasModels.factory('FotoModel', ['$q', 'Upload', 'FotoService', 'AbstractModel', fotoModelDefinition]);