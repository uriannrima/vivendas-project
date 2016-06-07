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

    public carro: CarroModel = null;
    public visitas: VisitaModel[] = new Array<VisitaModel>();

    @ViewChild('pnlControleEntrada') private pnlControleEntrada: ElementRef;
    @ViewChild('pnlCadastroVisita') private pnlCadastroVisita: ElementRef;
    @ViewChild('pnlCadastroVisitante') private pnlCadastroVisitante: ElementRef;
    @ViewChild('pnlVisitasAtivas') private pnlVisitasAtivas: ElementRef;

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

    fecharDetalhamento(query: string) {
        this.fecharCadastro();
    }

    fecharCadastro() {
        this.hide(this.pnlCadastroVisita, () => {
            this.carro = new CarroModel();
        });
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
