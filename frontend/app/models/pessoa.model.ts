import { BaseModel } from './base.model';

export enum TipoPessoa {
    Morador,
    Visitante
}

export class PessoaModel extends BaseModel {
    constructor(public nome: string, public tipo: TipoPessoa) {
        super();
    }

    public fromJSON(json: any) {
        super.fromJSON(json);
        
        this.nome = json.Nome;
    }
}