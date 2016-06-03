import { BaseModel } from './base.model';
import { CarroModel } from './carro.model';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export class VisitaModel extends BaseModel {

    public bloco: string;
    public apartamento: string;
    public entrada: Date;
    public saida: Date;
    public carroID: number;
    public ativa: boolean;
    public carro: CarroModel;
    public permanencia: any = {
        duracao: 0,
        formatada: ''
    };

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

    public atualizarPermanencia() {
        let saida = moment();
        if (this.saida) saida = moment(this.saida);
        let entrada = moment(this.entrada);

        this.permanencia.duracao = moment.duration(saida.diff(entrada));
        
        this.formatarPermanencia();
    }

    public formatarPermanencia() {
        // Recuperar duração.
        let duration = this.permanencia.duracao;

        // Formatar permanência.
        let days = duration.days() > 0 ? duration.days() + "d:" : "";
        let hours = duration.hours() > 0 || days != "" ? duration.hours() + "h:" : "";
        let minutes = duration.minutes() > 0 || hours != "" ? duration.minutes() + "m:" : "";
        let seconds = duration.seconds() > 0 || minutes != "" ? duration.seconds() + "s" : "";

        // Definir.
        this.permanencia.formatada = days + hours + minutes + seconds;
    }
}