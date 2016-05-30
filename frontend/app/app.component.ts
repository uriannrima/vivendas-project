import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { ControleEntradaComponent } from './components/all';

@Routes([
    {
        path: '/',
        component: ControleEntradaComponent
    }
])
@Component({
    selector: 'vsg-app',
    templateUrl: 'app/app.template.html',
    providers: [ROUTER_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
    public tempoMaximo: number = 2;
}