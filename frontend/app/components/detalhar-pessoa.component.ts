import { Component, OnInit, Input } from '@angular/core';

import { CarroModel } from '../models/carro.model';
import { PessoaModel } from '../models/pessoa.model';

@Component({
    selector: 'detalhar-pessoa',
    templateUrl: 'app/templates/detalhar-pessoa.template.html'
})
export class DetalharPessoaComponent {
    @Input() carro: CarroModel;
    @Input() pessoa: PessoaModel;
}