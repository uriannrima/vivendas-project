import { BaseModel } from './base.model';
import { CarroModel } from './carro.model';

export class VisitaModel extends BaseModel {
    constructor(public bloco: string, public apartamento: string, public duracao?: any, public carro?: CarroModel) {
        super();
    }
}