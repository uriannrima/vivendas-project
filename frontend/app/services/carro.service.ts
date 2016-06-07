import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { PessoaService } from './pessoa.service';
import { CarroModel } from '../models/carro.model';
import { Http } from '@angular/http';

@Injectable()
export class CarroService extends BaseService<CarroModel> {

    private scope: any;

    constructor(protected http: Http, protected pessoaService: PessoaService) {
        super('/carros', http);
        this.scope = this;
    }

    protected createModel(json: any): CarroModel {
        let carro = CarroModel.fromJSON(json);

        if (json.pessoaID) {
            this.pessoaService.load(json.pessoaID).then(pessoaModel => {
                carro.pessoa = pessoaModel;
            });
        }

        return carro;
    }
}