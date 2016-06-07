import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CarroService } from './carro.service';
import { OcorrenciaModel } from '../models/ocorrencia.model';
import { Http } from '@angular/http';

@Injectable()
export class OcorrenciaService extends BaseService<OcorrenciaModel> {

    constructor(protected http: Http, protected carroService: CarroService) {
        super('/ocorrencias', http);
    }

    protected createModel(json: any): OcorrenciaModel {
        let ocorrencia = OcorrenciaModel.fromJSON(json);

        if (json.carroID) {
            this.carroService.load(json.carroID).then(carroModel => {
                ocorrencia.carro = carroModel;
            });
        }

        return ocorrencia;
    }
}