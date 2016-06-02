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
            this.bloco = json.bloco;
            this.apartamento = json.apartamento;
            this.entrada = json.entrada;
            this.saida = json.saida;
            this.carroID = json.carroID;
        }
    }

    public static fromJSON(json: any): VisitaModel {
        return new VisitaModel(json);
    }
}