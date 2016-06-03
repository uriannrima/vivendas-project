import { BaseModel } from './base.model';
import { CarroModel } from './carro.model';

export class VisitaModel extends BaseModel {

    public bloco: string;
    public apartamento: string;
    public entrada: Date;
    public saida: Date;
    public carroID: number;
    public ativa: boolean;

    constructor(json?: any) {
        super(json);

        if (json != null) {
            this.bloco = json.bloco;
            this.apartamento = json.apartamento;
            if (json.entrada) this.entrada = new Date(json.entrada);
            if (json.saida) this.saida = new Date(json.saida);
            this.ativa = json.ativa;
            this.carroID = json.carroID;
        }
    }

    public static fromJSON(json: any): VisitaModel {
        return new VisitaModel(json);
    }
}