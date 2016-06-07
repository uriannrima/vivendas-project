import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[formatar-data]'
})
export class FormatarDataDirective {
    constructor(el: ElementRef) {
        let $element = $(el.nativeElement);
        $element.mask('00/00/0000 00:00:00');
    }
}