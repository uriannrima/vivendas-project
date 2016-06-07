import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CarroService } from '../services/carro.service';
import { PessoaService } from '../services/pessoa.service';
import { PessoaModel } from '../models/pessoa.model';
import { CarroModel } from '../models/carro.model';

@Component({
    selector: 'cadastro-visitante',
    templateUrl: 'app/templates/cadastro-visitante.template.html'
})
export class CadastroVisitanteComponent implements OnInit {

    @Output() cadastrandoVisitante = new EventEmitter<CarroModel>();
    @Output() visitanteCadastrado = new EventEmitter<CarroModel>();
    @Input() placa: string = '';
    @Input() pessoa: PessoaModel = null;
    @Input() carro: CarroModel = null;

    constructor(private pessoaService: PessoaService, private carroService: CarroService) { }

    ngOnInit() {
        this.pessoa = new PessoaModel();
        this.carro = new CarroModel();
    }

    registrarVisitante() {        
        this.carro.pessoa = this.pessoa;
        if (this.cadastrandoVisitante) this.cadastrandoVisitante.emit(this.carro);

        this.pessoaService.save(this.pessoa).then((pessoaRegistrada) => {
            this.carro.placa = this.placa;
            this.carro.pessoaID = pessoaRegistrada.id;
            this.carroService.save(this.carro).then((carroRegistrado) => {
                if (this.visitanteCadastrado) this.visitanteCadastrado.emit(carroRegistrado);
            });
        });
    }

}