import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[typeahead-placa]'
})
export class TypeaheadPlacaDirective {
    
    constructor(el: ElementRef) {
        let options = {
            ajax: {
                url: "https://vivendas-project-uriannrima.c9users.io/api/placas",
                displayField: "displayField",
                triggerLength: 3,
                method: "get"
            }
        };

        $(el.nativeElement).typeahead(options);
    }
}