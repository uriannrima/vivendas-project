import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CarroModel } from '../models/carro.model';
import { Http } from '@angular/http';

@Injectable()
export class CarroService extends BaseService<CarroModel> {
    constructor(protected http: Http) {
        super('/carros', http);
    }

    protected createModel(json: any): CarroModel {
        return CarroModel.fromJSON(json);
    }
}