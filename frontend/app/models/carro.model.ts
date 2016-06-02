import { BaseModel } from './base.model';

export class CarroModel extends BaseModel {

    public placa: string;
    public pessoaID: number;
    public modelo: string;
    public cor: string;

    constructor(json?: any) {
        super(json);
        
        if (json != null) {
            this.placa = json.placa;
            this.pessoaID = json.pessoaID;
            this.modelo = json.modelo;
            this.cor = json.cor;
        }
    }

    public static fromJSON(json: any): CarroModel {
        return new CarroModel(json);
    }
}