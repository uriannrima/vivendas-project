import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { PessoaModel } from '../models/pessoa.model';
import { Http } from '@angular/http';

@Injectable()
export class PessoaService extends BaseService<PessoaModel> {
    constructor(protected http: Http) {
        super('/pessoas', http);
    }

    protected createModel(json: any): PessoaModel {
        return PessoaModel.fromJSON(json);
    }
}