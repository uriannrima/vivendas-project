import { Component, OnInit } from '@angular/core';

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
export class ControleEntradaComponent extends BaseComponent implements OnInit {

    public carro: CarroModel = null;
    public visitas: VisitaModel[] = new Array<VisitaModel>();

    constructor(
        private carroService: CarroService,
        private pessoaService: PessoaService,
        private visitaService: VisitaService) {
        super();
    }

    ngOnInit() {
        this.show("#pnlPesquisaCarro");

        this.visitaService.find({ "ativa": true }).then(visitasArray => {
            if (visitasArray && visitasArray.length > 0) {
                this.visitas = visitasArray;
                this.show("#pnlVisitasAtivas");
            }
        });
    }

    fecharDetalhamento(query: string) {
        this.fecharCadastro();
    }

    fecharCadastro() {
        this.hide("#pnlCadastroVisita", () => {
            this.carro = new CarroModel();
        });
    }

    carregarDados(carro: CarroModel) {
        this.carro = carro;
        this.show("#pnlCadastroVisita");
    }

    carregarVisita(visita: VisitaModel) {
        this.visitas.push(visita);
        this.show("#pnlVisitasAtivas");
    }

    fecharPainelVisitas() {
        this.hide("#pnlVisitasAtivas");
    }

}
