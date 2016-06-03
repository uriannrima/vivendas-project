import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CarroService } from './carro.service';
import { VisitaModel } from '../models/visita.model';
import { Http } from '@angular/http';

@Injectable()
export class VisitaService extends BaseService<VisitaModel> {
    constructor(protected http: Http, protected carroService: CarroService) {
        super('/visitas', http);
    }

    protected createModel(json: any): VisitaModel {
        let visita = VisitaModel.fromJSON(json);
        
        if (json.carroID) {
            this.carroService.load(json.carroID).then(carroModel => {
                visita.carro = carroModel;
            });
        }
        
        return visita;
    }
}