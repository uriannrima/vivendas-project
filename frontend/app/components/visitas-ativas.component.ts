import { Component, Input, OnInit } from '@angular/core';

import { VisitaModel } from '../models/visita.model';

@Component({
    selector: 'visitas-ativas',
    templateUrl: 'app/templates/visitas-ativas.template.html',
})
export class VisitasAtivasComponent implements OnInit {
    @Input() visitas: VisitaModel[];

    ngOnInit() {
        let seconds = 0;
        setInterval(() => {
            console.log(seconds++);
        }, 1000)
    }
}