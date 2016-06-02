import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

// RxJS possui extensões para o TS/JS, neste caso, importando extensão de "toPromise()".
import 'rxjs/add/operator/toPromise';

import { BaseModel } from '../models/base.model';

@Injectable()
export abstract class BaseService<T extends BaseModel> {

    constructor(protected apiVerb: string, protected http?: Http, protected baseUrl: string = 'https://vivendas-project-uriannrima.c9users.io/api') { }

    /**
     * Construir entidade do modelo utilizando o JSON passado como parametro.
     * @param json JSON para construção da entidade.
     * @returns T Entidade instanciada.
     */
    protected abstract createModel(json: any): T;

    /**
     * Retornar URL do Serviço concatenada com o Verbo da Subclasse.
     */
    protected getServiceUrl() {
        return this.baseUrl + this.apiVerb;
    }

    /**
     * Criar querystring apartir do modelo passado por parametro.
     * Exemplo entidade com { "id" : 1 } ira retornar "?id=1", se { "id" : 1, "nome" : "meuNome" } ira retornar "?id=1&nome=meuNome".
     * @param model Modelo para ser utilizado como base.
     * @returns string Querystring pronta.
     */
    protected createQueryString(model: T): string {
        let parameters = "";

        // Iterar pelas "keys" ou "propriedades" do json/modelo.
        Object.keys(model).forEach((propertyName) => {

            // Recuperar valor da propriedade.
            let propertyValue = model[propertyName];

            // Se propriedade possui valor.
            if (propertyValue != undefined) {

                // Se é a primeira
                if (parameters == "") {
                    // Colocar "?"
                    parameters = "?";
                } else {
                    // Se não, colocar "&"
                    parameters += '&';
                }

                // Concatenar ao parametro anterior.
                parameters += propertyName + "=" + propertyValue;
            }
        });

        // Retornar parametros.
        return parameters;
    }

    /** 
     * Carregar uma única entidade do modelo apartir de um ID.
     * @param id ID da Entidade.
     * @returns Uma Promise com Resolve de uma única entidade, ou null, ou Promise com Reason do erro. 
     */
    load(id: number): Promise<T> {
        // Retornar promise de get.
        return this.http.get(this.getServiceUrl() + "?id=" + id).toPromise().then(response => {
            // Recuperar JSON do Response.
            let data: any[] = response.json();

            // Se retornou algo.
            if (data.length > 0) {
                // Criar entidade do model.
                return this.createModel(data[0]);
            }

            // Se não, retornar vazio.
            return null;
        }).catch(reason => {
            // Retornar razão do erro.
            return reason;
        });
    }

    /** 
     * Retornar um array de entidades do modelo que respeitam as propriedades da entidade passada por parametro.
     * @param model Modelo contendo parametros para a pesquisa. Pode ser utilizado filtros de MySQL (ex: 'AAA%'). 
     * @returns Uma Promise com Resolve de um array entidade, ou null, ou Promise com Reason do erro. 
     */
    find(json: any): Promise<T[]> {
        // Retornar promise de get.
        return this.http.get(this.getServiceUrl() + this.createQueryString(json)).toPromise().then(response => {

            // Recuperar JSON do Response.
            let data: any[] = response.json();

            // Se retornou algo.
            if (data.length > 0) {
                // Invocar createModel para cada objeto dentro do data.
                return data.map(this.createModel);
            }

            // Se não, retornar vazio.
            return null;
        }).catch(reason => {
            // Retornar razão do erro.
            return reason;
        });
    }

    save(model: T) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.getServiceUrl(), JSON.stringify(model), { headers: headers }).toPromise().then(response => {
            // Recuperar JSON do Response.
            let data: any = response.json();
            
            // Retornar uma promise para carregamento da entidade, usando ID retornado pelo save.
            return this.load(data.id).then(model => {
                // Retornar o modelo.
                return model;
            }).catch(reason => {
            // Retornar razão do erro.
                return reason;
            });
        }).catch(reason => {
            // Retornar razão do erro.
            return reason;
        });
    }

    delete(id: number) {

    }

    update(id: number, model: T) {

    }
}