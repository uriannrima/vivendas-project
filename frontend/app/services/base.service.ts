import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

// RxJS possui extensões para o TS/JS, neste caso, importando extensão de "toPromise()".
import 'rxjs/add/operator/toPromise';

import { BaseModel } from '../models/base.model';

@Injectable()
export abstract class BaseService<T extends BaseModel> {

    constructor(protected baseApi: string, protected http?: Http, protected baseUrl: string = 'https://vivendas-project-uriannrima.c9users.io/api') { }

    protected abstract createModel(json: any): T;

    private getServiceUrl() {
        return this.baseUrl + this.baseApi;
    }

    load(id: number): Promise<T> {
        return this.http.get(this.getServiceUrl() + "?id=" + id).toPromise()
            .then(response => {
                let data = response.json();
                if (data.length > 0) {
                    return this.createModel(data[0]);
                } else {
                    return null;
                }
            })
            .catch(reason => {
                return reason;
            });
    }

    find(model: T) {

    }

    save(model: T) {

    }

    delete(id: number) {

    }

    update(id: number, model: T) {

    }
}