import { Component, OnInit } from '@angular/core';

import { FormatarPlacaDirective } from '../directives/formatar-placa.directive';
import { TypeaheadPlacaComponent } from './typeahead-placa.component';

@Component({
    selector: 'pesquisa-placa',
    templateUrl: 'app/components/templates/pesquisa-placa.template.html',
    directives: [
        FormatarPlacaDirective,
        TypeaheadPlacaComponent
    ]
})
export class PesquisaPlacaComponent {
    public onChange($event) {
        console.log($event.target.value);
    }
}