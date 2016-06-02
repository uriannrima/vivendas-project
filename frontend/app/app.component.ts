import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { ControleEntradaComponent } from './components/controle-entrada.component';

import { CarroService } from './services/carro.service';
import { PessoaService } from './services/pessoa.service';
import { VisitaService } from './services/visita.service';

@Routes([
    {
        path: '/',
        component: ControleEntradaComponent
    }
])
@Component({
    selector: 'vsg-app',
    templateUrl: 'app/app.template.html',
    providers: [ROUTER_PROVIDERS, CarroService, PessoaService, VisitaService],
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
    public tempoMaximo: number = 2;
}