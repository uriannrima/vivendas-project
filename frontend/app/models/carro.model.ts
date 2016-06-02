import { BaseModel } from './base.model';

export class CarroModel extends BaseModel {

    public placa: string;
    public pessoaID: number;
    public modelo: string;
    public cor: string;

    constructor(json?: any) {
        super(json);
        
        if (json != null) {
            this.placa = json.Placa;
            this.pessoaID = json.PessoaID;
            this.modelo = json.Modelo;
            this.cor = json.Cor;
        }
    }

    public static fromJSON(json: any): CarroModel {
        return new CarroModel(json);
    }
}