import { Directive, ElementRef } from '@angular/core';

import {CarroModel} from '../models/all'

var CarrosDB: Array<string> = [
    'AAA-1111',
    'AAA-1112',
    'AAA-1113',
    'AAA-1114',
    'AAA-1115',
    'AAA-1116'
];

@Directive({
    selector: '[typeahead-placa]'
})
export class TypeaheadPlacaDirective {

    mySource: any = [
        { id: 1, name: 'Terry' },
        { id: 2, name: 'Mark' },
        { id: 3, name: 'Jacob' }
    ];

    constructor(el: ElementRef) {
        let configuration = {
            ajax: {
                url: "https://vivendas-project-uriannrima.c9users.io/api/placas",
                displayField: "displayField",
                triggerLength: 3,
                method: "get"
            }
        };

        $(el.nativeElement).typeahead(configuration);
    }
}