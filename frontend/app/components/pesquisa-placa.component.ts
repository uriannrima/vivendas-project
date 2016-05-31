import { Component, OnInit } from '@angular/core';

import { FormatarPlacaDirective, TypeaheadPlacaDirective } from '../directives/all';

@Component({
    selector: 'pesquisa-placa',
    templateUrl: 'app/templates/pesquisa-placa.template.html',
    directives: [FormatarPlacaDirective, TypeaheadPlacaDirective]
})
export class PesquisaPlacaComponent {
    public onChange($event) {
        console.log($event.target.value);
    }
}