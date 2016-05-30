import { Component, OnInit } from '@angular/core';

import { PesquisaPlacaComponent } from './pesquisa-placa.component';
import { CadastroVisitaComponent } from './cadastro-visita.component';
import { CadastroVisitanteComponent } from './cadastro-visitante.component';
import { VisitasAtivasComponent } from './visitas-ativas.component';

import { CarroModel, VisitaModel, PessoaModel } from '../models/all';

@Component({
    selector: 'controle-entrada',
    templateUrl: 'app/templates/controle-entrada.template.html',
    directives: [
        PesquisaPlacaComponent,
        CadastroVisitaComponent,
        CadastroVisitanteComponent,
        VisitasAtivasComponent
    ]
})
export class ControleEntradaComponent {
    public carro: CarroModel = new CarroModel('');
}
