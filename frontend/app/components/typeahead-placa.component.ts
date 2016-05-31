import { Component, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

import { FormatarPlacaDirective } from '../directives/formatar-placa.directive';

@Component({
    selector: 'typeahead-placa',
    templateUrl: 'app/components/templates/typeahead-placa.template.html',
    directives: [
        FormatarPlacaDirective
    ]
})
export class TypeaheadPlacaComponent implements OnInit {

    @Output() onSelect = new EventEmitter<string>();
    element: HTMLElement;

    constructor(el: ElementRef) {
        this.element = el.nativeElement as HTMLElement;
    }

    ngOnInit() {
        // Configurar typeahead no Init, já que somente neste ponto a tela esta "pronta".
        this.configureTypeahead();
    }

    configureTypeahead() {
        let options = {
            updater: this.updater,
            ajax: {
                url: "https://vivendas-project-uriannrima.c9users.io/api/placas",
                displayField: "displayField",
                triggerLength: 3,
                method: "get"
            }
        };
        
        $(this.element.children[0]).typeahead(options);
    }

    updater(item) {
        if (this.onSelect) this.onSelect.emit(item);
        return item + " A ";
    }
}