import { Component, OnInit } from '@angular/core';

import { BaseComponent } from './base.component';
import { PesquisaPlacaComponent } from './pesquisa-placa.component';
import { CadastroVisitaComponent } from './cadastro-visita.component';
import { CadastroVisitanteComponent } from './cadastro-visitante.component';
import { VisitasAtivasComponent } from './visitas-ativas.component';
import { DetalharPessoaComponent } from './detalhar-pessoa.component';

import { CarroService } from '../services/carro.service';
import { PessoaService } from '../services/pessoa.service';

import { VisitaModel } from '../models/visita.model';
import { CarroModel } from '../models/carro.model';
import { PessoaModel } from '../models/pessoa.model';

@Component({
    selector: 'controle-entrada',
    templateUrl: 'app/templates/controle-entrada.template.html',
    directives: [
        PesquisaPlacaComponent,
        CadastroVisitaComponent,
        CadastroVisitanteComponent,
        VisitasAtivasComponent,
        DetalharPessoaComponent
    ],
    providers: [CarroService, PessoaService]
})
export class ControleEntradaComponent extends BaseComponent implements OnInit {

    public visita: VisitaModel = null;
    public carro: CarroModel = null;
    public pessoa: PessoaModel = null

    constructor(private carroService: CarroService, private pessoaService: PessoaService) {
        super();
    }

    ngOnInit() {
        this.show("#pnlPesquisaPlaca");
    }

    carregarDados($event: any) {
        console.log($event);
        this.carroService.load(40)
            .then((model) => {
                this.carro = model;
                this.pessoaService.load(this.carro.pessoaID)
                    .then((model) => {
                        this.pessoa = model;
                    });
            });
    }
}
