import { Component, OnInit } from '@angular/core';

import {CarroModel} from '../models/all'

@Component({
    selector: 'pesquisa-placa',
    templateUrl: 'app/templates/pesquisa-placa.template.html'
})
export class PesquisaPlacaComponent {
    public onChange($event) {
        console.log($event.target.value);
    }
}

var CarrosDB: Array<CarroModel> = [
    new CarroModel('AAA-1111'),
    new CarroModel('AAA-1111'),
    new CarroModel('BBB-1111'),
    new CarroModel('BBB-1111'),
    new CarroModel('CCC-1111'),
    new CarroModel('CCC-1111')
]