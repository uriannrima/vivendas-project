import { BaseModel } from './base.model';
import { CarroModel } from './carro.model';

export class VisitaModel extends BaseModel {

    public bloco: string;
    public apartamento: string;
    public entrada: Date;
    public saida: Date;
    public carroID: number;

    constructor(json?: any) {
        super(json);

        if (json != null) {
            this.bloco = json.Bloco;
            this.apartamento = json.Apartamento;
            this.entrada = json.Entrada;
            this.saida = json.Saida;
            this.carroID = json.CarroID;
        }
    }

    public static fromJSON(json: any): VisitaModel {
        return new VisitaModel(json);
    }
}