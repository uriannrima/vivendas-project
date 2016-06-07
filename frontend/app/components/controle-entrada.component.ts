import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent } from './base.component';
import { PesquisaCarroComponent } from './pesquisa-carro.component';
import { CadastroVisitaComponent } from './cadastro-visita.component';
import { CadastroVisitanteComponent } from './cadastro-visitante.component';
import { VisitasAtivasComponent } from './visitas-ativas.component';
import { DetalharPessoaComponent } from './detalhar-pessoa.component';
import { CadastroOcorrenciaComponent } from './cadastro-ocorrencia.component';
import { CarroService } from '../services/carro.service';
import { PessoaService } from '../services/pessoa.service';
import { VisitaService } from '../services/visita.service';
import { CarroModel } from '../models/carro.model';
import { PessoaModel } from '../models/pessoa.model';
import { VisitaModel } from '../models/visita.model';

@Component({
    selector: 'controle-entrada',
    templateUrl: 'app/templates/controle-entrada.template.html',
    directives: [
        PesquisaCarroComponent,
        CadastroVisitaComponent,
        CadastroVisitanteComponent,
        VisitasAtivasComponent,
        DetalharPessoaComponent,
        CadastroOcorrenciaComponent
    ]
})
export class ControleEntradaComponent extends BaseComponent implements OnInit, AfterViewInit {

    @ViewChild('pnlControleEntrada') private pnlControleEntrada: ElementRef;
    @ViewChild('pnlCadastroVisita') private pnlCadastroVisita: ElementRef;
    @ViewChild('pnlCadastroVisitante') private pnlCadastroVisitante: ElementRef;
    @ViewChild('pnlVisitasAtivas') private pnlVisitasAtivas: ElementRef;

    public carro: CarroModel = null;
    public visitas: VisitaModel[] = new Array<VisitaModel>();
    public placaCompleta: boolean = false;
    public placa: string = '';

    constructor(
        private carroService: CarroService,
        private pessoaService: PessoaService,
        private visitaService: VisitaService) {
        super();
    }

    /** Evento invocado durante inicialização do componente. Obs: Componentes não prontos. */
    ngOnInit() {
        this.visitaService.find({ "ativa": true }).then(visitasArray => {
            if (visitasArray && visitasArray.length > 0) {
                this.visitas = visitasArray;
            }
        });
    }

    /** Evento invocado quando o conteudo da View do componente já esta pronto. */
    ngAfterViewInit() {
        this.show(this.pnlControleEntrada, () => {
            if (this.visitas.length > 0) {
                this.show(this.pnlVisitasAtivas);
            }
        });
    }

    /** Fechar paineis. */
    fecharPaineis(query: string) {
        this.fecharPaineisCadastro();
        this.placaCompleta = (query.length == 8);
        if (this.placaCompleta) this.placa = query;
    }

    /** Fechar paineis de cadastro de visitante e visita. */
    fecharPaineisCadastro() {
        this.hide(this.pnlCadastroVisitante);
        this.hide(this.pnlCadastroVisita, () => {
            this.carro = new CarroModel();
        });
    }

    abrirCadastroVisitante(data: any) {
        if (this.placaCompleta && data.length == 0) {
            this.show(this.pnlCadastroVisitante);
        }
    }

    carregarDados(carro: CarroModel) {
        this.carro = carro;
        this.show(this.pnlCadastroVisita);
    }

    carregarVisita(visita: VisitaModel) {
        this.visitas.push(visita);
        this.show(this.pnlVisitasAtivas);
    }

    fecharPainelVisitas() {
        this.hide(this.pnlVisitasAtivas);
    }

}
