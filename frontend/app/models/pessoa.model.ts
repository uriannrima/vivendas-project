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
            this.nome = json.Nome;
            this.tipo = json.Tipo;
            this.bloco = json.Bloco;
            this.apartamento = json.Apartamento;
        }
    }

    public static fromJSON(json: any): PessoaModel {
        return new PessoaModel(json);
    }
} 