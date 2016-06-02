import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[formatar-placa]'
})
export class FormatarPlacaDirective {
    constructor(el: ElementRef) {
        let $element = $(el.nativeElement);
        $element.mask('SSS-0000');
    }
}