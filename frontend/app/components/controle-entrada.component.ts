import { Component, OnInit } from '@angular/core';

import { BaseComponent } from './base.component';
import { PesquisaCarroComponent } from './pesquisa-carro.component';
import { CadastroVisitaComponent } from './cadastro-visita.component';
import { CadastroVisitanteComponent } from './cadastro-visitante.component';
import { VisitasAtivasComponent } from './visitas-ativas.component';
import { DetalharPessoaComponent } from './detalhar-pessoa.component';

import { CarroService } from '../services/carro.service';
import { PessoaService } from '../services/pessoa.service';

import { CarroModel } from '../models/carro.model';
import { PessoaModel } from '../models/pessoa.model';

@Component({
    selector: 'controle-entrada',
    templateUrl: 'app/templates/controle-entrada.template.html',
    directives: [
        PesquisaCarroComponent,
        CadastroVisitaComponent,
        CadastroVisitanteComponent,
        VisitasAtivasComponent,
        DetalharPessoaComponent
    ]
})
export class ControleEntradaComponent extends BaseComponent implements OnInit {
    
    public carro: CarroModel = null;
    public pessoa: PessoaModel = null

    constructor(private carroService: CarroService, private pessoaService: PessoaService) {
        super();
    }

    ngOnInit() {
        this.show("#pnlPesquisaPlaca");
    }

    carregarDados(carro: CarroModel) {
        this.carro = carro;
        this.pessoaService.load(this.carro.pessoaID)
            .then((pessoa) => {
                this.pessoa = pessoa;
                this.show("#pnlCadastroVisita");
            });
    }
}
