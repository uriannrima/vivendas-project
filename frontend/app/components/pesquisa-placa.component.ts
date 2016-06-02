import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TypeaheadComponent } from './typeahead.component';

@Component({
    selector: 'pesquisa-placa',
    templateUrl: 'app/templates/pesquisa-placa.template.html',
    directives: [
        TypeaheadComponent
    ]
})
export class PesquisaPlacaComponent {

    @Output() onSelect = new EventEmitter<string>();

    onPlacaSelecionada($event: any) {
        if (this.onSelect) this.onSelect.emit($event);
    }
}