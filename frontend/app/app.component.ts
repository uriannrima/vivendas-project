import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { ControleEntradaComponent } from './components/controle-entrada.component';
import { CadastroOcorrenciaComponent } from './components/cadastro-ocorrencia.component';

import { CarroService } from './services/carro.service';
import { PessoaService } from './services/pessoa.service';
import { VisitaService } from './services/visita.service';
import { OcorrenciaService } from './services/ocorrencia.service';
import { ConfiguracaoService } from './services/configuracao.service';

@Routes([
    {
        path: '/',
        component: ControleEntradaComponent
    },
    {
        path: '/ocorrencias',
        component: CadastroOcorrenciaComponent
    }
])
@Component({
    selector: 'vsg-app',
    templateUrl: 'app/app.template.html',
    providers: [ROUTER_PROVIDERS, CarroService, PessoaService, VisitaService, OcorrenciaService, ConfiguracaoService],
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit {
    public tempoMaximo: number = 2;

    constructor(private configuracaoService: ConfiguracaoService) { };

    ngOnInit() {
        this.tempoMaximo = this.configuracaoService.tempoMaximo;
    }
}