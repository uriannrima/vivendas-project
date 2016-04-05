/** Modelo de Visita. **/
'use strict';

/**
 * Método para encapsular definição da classe do modelo.
 * 
 * Atenção: O que esta no "prototype" é de acesso a todos. Propriedades no prototype seriam "static"
 * Se uma propriedade é de um objeto independente, não defirni dentro do prototype.
 * 
 * @param {ngService} modelService Serviço utilizado pelo modelo para recuperar seus dados.
 * @return {VisitaModel} Entidade.
 */
function abstractModelDefinition($q) {

    /**
     * Método construtor da classe do model.
     */
    var AbstractModel = function(service) {
        this.Service = service;
        this.FindParameters = {};
    };

    /**
     * Definição da "classe" abstrata.
     */
    AbstractModel.prototype = {
        /**
         * Método para "carregar" a estrutura do modelo.
         */
        loadModel: function(model) {
            if (model) {
                angular.extend(this, model);
            }
        },

        /**
         * Método utilizado pelo modelo abstrato para criar instancia da classe filha.
         * Deve ser sobrescrito retornando um "new SubModelo()".
         */
        getInstance: function() {
            return {};
        },
        /**
         * Método de parametros pra função de find que deve ser sobrescrito.
         * Por default vem com parametro "ID".
         */
        getFindParameters: function(model) {
            return {
                id: this.ID
            };
        },

        /**
         * Carregar dados da pessoa consumindo serviço.
         * 
         * @return {Promise} Objeto com promessa de retorno da função (usar then e catch).
         */
        load: function(id) {

            // Definir parametro do Find.
            this.ID = id;

            // Criar um deferred para geração de promise.
            var deferred = $q.defer();

            // Criar referencia para escopo da entidade.
            var scope = this;

            // Executar find.
            this.find().then(
                function(data) {
                    // Carregar entidade encontrada.
                    scope.loadModel(data[0]);

                    // Resolver a Promise
                    deferred.resolve(scope);
                }
            ).catch(
                function(data) {
                    // Informar erro.
                    console.log("Erro ao carregar dados.");

                    // Rejeitar a chamada assincrona.
                    deferred.reject("Erro ao carregar dados.");
                }
            );

            // Retornar promise da resolução.
            return deferred.promise;
        },
        /**
         * Método para pesquisar e retornar uma lista com dados que respeitam os parametros da entidade.
         * 
         * @return {Promise} Objeto com promessa de retorno da função (usar then e catch).
         */
        find: function() {

            // Criar um deferred para geração de promise.
            var deferred = $q.defer();

            // Criar referencia para escopo da entidade.
            var scope = this;

            // Invocar serviço.
            this.Service.get(this.getFindParameters(),
                function(data) {
                    var array = [];

                    for (var index = 0; index < data.length; index++) {
                        var model = scope.getInstance(data[index]);
                        array.push(model);
                    }

                    // Enviar dados recuperados para a promise.
                    deferred.resolve(array);
                },
                function(data) {
                    // Informar erro.
                    console.log("Erro ao carregar dados.");

                    // Rejeitar a chamada assincrona.
                    deferred.reject("Erro ao carregar dados.");
                }
            );

            // Retornar promise da resolução.
            return deferred.promise;
        },

        /**
         * Método para solicitar ao serviço inserção desta entidade.
         * 
         * @return {Promise} Objeto com promessa de retorno da função (usar then e catch).
         */
        save: function() {

            // Criar um deferred para geração de promise.
            var deferred = $q.defer();

            // Definir this como escopo.
            var scope = this;

            this.Service.save({
                model: this
            }, function(data) {
                // Carregar dados da entidade criada.
                scope.load(data.ID).then(function(data) {
                    // Resolver a chamada assincrona passando "this" (que esta no scope).
                    deferred.resolve(scope);
                });
            }, function(data) {
                console.log("Não incluido.");

                // Rejeitar a chamada assincrona.
                deferred.reject("Não incluido.");
            });

            // Retornar promise da resolução.
            return deferred.promise;
        },

        /**
         * Método para solicitar ao serviço delete desta entidade.
         * 
         * @return {Promise} Objeto com promessa de retorno da função (usar then e catch).
         */
        delete: function() {

            // Criar um deferred para geração de promise.
            var deferred = $q.defer();

            this.Service.delete({
                id: this.ID
            }, function(data) {
                console.log("Excluido com sucesso.");

                // Resolver a chamada assincrona passando "this" (que esta no scope).
                deferred.resolve("Excluido com sucesso.");
            }, function(data) {
                console.log("Não excluido.");

                // Rejeitar a chamada assincrona.
                deferred.reject("Não excluido.");
            });

            // Retornar promise da resolução.
            return deferred.promise;
        },

        /**
         * Método para solicitar ao serviço atualização desta entidade.
         * 
         * @return {Promise} Objeto com promessa de retorno da função (usar then e catch).
         */
        update: function() {

            // Criar um deferred para geração de promise.
            var deferred = $q.defer();

            this.Service.update({
                id: this.ID,
                model: this
            }, function(data) {
                console.log("Atualizado com sucesso.");

                // Resolver a chamada assincrona passando "this" (que esta no scope).
                deferred.resolve("Atualizado com sucesso.");
            }, function(data) {
                console.log("Não atualizado.");

                // Rejeitar a chamada assincrona.
                deferred.reject("Não atualizado.");
            });

            // Retornar promise da resolução.
            return deferred.promise;
        }
    };

    return AbstractModel;
}

// Registrar Abstract Model.
vivendasModels.factory('AbstractModel', ['$q', abstractModelDefinition]);