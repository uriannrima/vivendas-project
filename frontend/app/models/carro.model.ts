import { BaseModel } from './base.model';

export class CarroModel extends BaseModel {
    constructor(public id?: number, public placa?: string, public pessoaID?: number, public modelo?: string, public cor?: string) {
        super(id);
    }

    public static fromJSON(json: any): CarroModel {
        return new CarroModel(json.ID, json.Placa, json.PessoaID, json.Modelo, json.Cor);
    }
}