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

    @Output() pesquisandoCarro = new EventEmitter<string>();
    @Output() carrosRecebidos = new EventEmitter<any>();
    @Output() carroCarregado = new EventEmitter<CarroModel>();

    constructor(private carroService: CarroService) { }

    placaEnviada(query: string) {
        if (this.pesquisandoCarro) this.pesquisandoCarro.emit(query);
    }

    placasRecebidas(data: any) {
        if (this.carrosRecebidos) this.carrosRecebidos.emit(data);
    }

    placaSelecionada(placa: string) {
        this.carroService.find({ "placa": placa }).then((carrosArray) => {
            if (this.carroCarregado && carrosArray && carrosArray.length > 0) {
                this.carroCarregado.emit(carrosArray[0]);
            }
        });
    }
}