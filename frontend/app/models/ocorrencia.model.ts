import { BaseModel } from './base.model';
import { CarroModel } from './carro.model';

export class OcorrenciaModel extends BaseModel {
    
    public descricao : string = '';
    public carroID : number;
    public bloco : number;
    public apartamento : number;
    public data : Date;
    public dataCriacao : Date;
    public carro : CarroModel = null;

    constructor(json?: any) {
        super(json);
        
        if (json != null) {
            this.descricao = json.descricao;
            this.carroID = json.carroID;
            this.bloco = json.bloco;
            this.apartamento = json.apartamento;
            this.data = json.data;
        }
    }

    public static fromJSON(json: any): OcorrenciaModel {
        return new OcorrenciaModel(json);
    }
}