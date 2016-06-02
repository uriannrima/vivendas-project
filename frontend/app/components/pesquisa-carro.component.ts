import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TypeaheadComponent } from './typeahead.component';

import { CarroService } from '../services/carro.service';
import { CarroModel } from '../models/carro.model';

@Component({
    selector: 'pesquisa-carro',
    templateUrl: 'app/templates/pesquisa-carro.template.html',
    directives: [
        TypeaheadComponent
    ]
})
export class PesquisaCarroComponent {

    constructor(private carroService: CarroService) { }

    @Output() carroCarregado = new EventEmitter<CarroModel>();

    placaSelecionada(placa: string) {
        this.carroService.find({ "placa": placa }).then((carrosArray) => {
            if (this.carroCarregado && carrosArray && carrosArray.length > 0) {
                this.carroCarregado.emit(carrosArray[0]);
            }
        });
    }
}