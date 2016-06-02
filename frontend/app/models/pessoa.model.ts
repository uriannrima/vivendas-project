import { BaseModel } from './base.model';

export enum TipoPessoa {
    Morador,
    Visitante
}

export class PessoaModel extends BaseModel {

    constructor(public id?: number, public nome?: string, public tipo?: TipoPessoa) {
        super();
    }

    public static fromJSON(json: any): PessoaModel {
        return new PessoaModel(json.ID, json.Nome, json.Tipo);
    }
} 