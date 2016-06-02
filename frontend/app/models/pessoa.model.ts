import { BaseModel } from './base.model';

export enum TipoPessoa {
    Morador, Visitante
}

export class PessoaModel extends BaseModel {

    public nome: string;
    public tipo: TipoPessoa;
    public bloco : number;
    public apartamento : number;    

    constructor(json?: any) {
        super(json);

        if (json != null) {
            this.nome = json.nome;
            this.tipo = json.tipo;
            this.bloco = json.bloco;
            this.apartamento = json.apartamento;
        }
    }

    public static fromJSON(json: any): PessoaModel {
        return new PessoaModel(json);
    }
} 