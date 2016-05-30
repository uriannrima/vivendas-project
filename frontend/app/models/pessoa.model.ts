export enum TipoPessoa {
    Morador,
    Visitante
}

export class PessoaModel {
    constructor(public nome: string, public tipo: TipoPessoa) {

    }
}