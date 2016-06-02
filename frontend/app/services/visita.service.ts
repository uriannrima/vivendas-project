import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { VisitaModel } from '../models/visita.model';
import { Http } from '@angular/http';

@Injectable()
export class VisitaService extends BaseService<VisitaModel> {
    constructor(protected http: Http) {
        super('/visitas', http);
    }

    protected createModel(json: any): VisitaModel {
        return VisitaModel.fromJSON(json);
    }
}