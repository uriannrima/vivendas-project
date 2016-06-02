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

        Object.keys(model).forEach((propertyName) => {
            let propertyValue = model[propertyName];
            if (propertyValue != undefined) {
                if (parameters == "") {
                    parameters = "?";
                } else {
                    parameters += '&';
                }
                parameters += propertyName + "=" + propertyValue;
            }
        });

        return parameters;
    }

    /** 
     * Carregar uma única entidade do modelo apartir de um ID.
     * @param id ID da Entidade.
     * @returns Uma Promise com Resolve de uma única entidade, ou null, ou Promise com Reason do erro. 
     */
    load(id: number): Promise<T> {
        return this.http.get(this.getServiceUrl() + "?id=" + id).toPromise()
            .then(response => {
                let data: any[] = response.json();

                if (data.length > 0) {
                    return this.createModel(data[0]);
                }

                return null;
            })
            .catch(reason => {
                return reason;
            });
    }

    /** 
     * Retornar um array de entidades do modelo que respeitam as propriedades da entidade passada por parametro.
     * @param model Modelo contendo parametros para a pesquisa. Pode ser utilizado filtros de MySQL (ex: 'AAA%'). 
     * @returns Uma Promise com Resolve de um array entidade, ou null, ou Promise com Reason do erro. 
     */
    find(model: T): Promise<T[]> {
        return this.http.get(this.getServiceUrl() + this.createQueryString(model))
            .toPromise()
            .then(response => {
                let data: any[] = response.json();

                if (data.length > 0) {

                    let result: T[] = new Array<T>();

                    data.forEach((jsonObject) => {
                        result.push(this.createModel(jsonObject));
                    });

                    return result;
                } else {
                    return null;
                }
            })
            .catch(reason => {
                return reason;
            });
    }

    save(model: T) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.getServiceUrl(), JSON.stringify(model), { headers: headers })
            .toPromise()
            .then(response => {
                console.log(response);
            })
            .catch(reason => {
                console.log(reason);
            });
    }

    delete(id: number) {

    }

    update(id: number, model: T) {

    }
}