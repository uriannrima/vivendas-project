import { Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';

import { DetalharPessoaComponent } from './detalhar-pessoa.component';

import { VisitaService } from '../services/visita.service';

import { VisitaModel } from '../models/visita.model';
import { CarroModel } from '../models/carro.model';
import { PessoaModel } from '../models/pessoa.model';

@Component({
    selector: 'cadastro-visita',
    templateUrl: 'app/templates/cadastro-visita.template.html',
    directives: [DetalharPessoaComponent]
})
export class CadastroVisitaComponent implements OnInit {
    
    public visita: VisitaModel = null;
    @Input() carro: CarroModel;
    @Input() pessoa: PessoaModel;
    @Output() cadastrandoVisita = new EventEmitter<VisitaModel>();
    @Output() visitaCadastrada = new EventEmitter<VisitaModel>();

    constructor(private visitaService: VisitaService) {
    }

    ngOnInit() {
        this.visita = new VisitaModel();
    }

    registrarVisita() {

        if (this.carro != null) {
            this.visita.carroID = this.carro.id;
            this.visita.entrada = new Date();
        }        
        
        if (this.cadastrandoVisita) this.cadastrandoVisita.emit(this.visita); 

        this.visitaService.save(this.visita).then((visita) => {
            if (this.visitaCadastrada) this.visitaCadastrada.emit(visita);
        });

        this.visita = new VisitaModel();
    }
}