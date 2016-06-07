import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

import { BaseComponent } from './base.component';
import { PesquisaCarroComponent } from './pesquisa-carro.component';
import { DetalharPessoaComponent } from './detalhar-pessoa.component';

import { OcorrenciaService } from '../services/ocorrencia.service';


import { OcorrenciaModel } from '../models/ocorrencia.model';
import { CarroModel } from '../models/carro.model';

import { FormatarDataDirective } from '../directives/formatar-data.directive';

@Component({
    selector: 'cadastro-ocorrencia',
    templateUrl: 'app/templates/cadastro-ocorrencia.template.html',
    directives: [PesquisaCarroComponent, DetalharPessoaComponent, FormatarDataDirective]
})
export class CadastroOcorrenciaComponent extends BaseComponent implements OnInit, AfterViewInit {


    @ViewChild('pnlCadastroOcorrencia') private pnlCadastroOcorrencia: ElementRef;
    @ViewChild('pnlDetalheDados') private pnlDetalheDados: ElementRef;
    @ViewChild('pnlUpload') private pnlUpload: ElementRef;

    public ocorrencia: OcorrenciaModel = null;
    public txtData: string = '';
    @Input() carro: CarroModel = null;
    @Output() cadastrandoOcorrencia = new EventEmitter<OcorrenciaModel>();
    @Output() ocorrenciaCadastrada = new EventEmitter<OcorrenciaModel>();

    constructor(private ocorrenciaService: OcorrenciaService) {
        super();
    }

    ngOnInit() {
        this.criarNovaOcorrencia();
    }

    ngAfterViewInit() {
        this.show(this.pnlCadastroOcorrencia);
    }

    fecharPaineis() {
        this.hide(this.pnlDetalheDados);
    }

    carregarCarro(carro: CarroModel) {
        this.carro = carro;
        this.show(this.pnlDetalheDados);
    }

    criarNovaOcorrencia() {
        this.ocorrencia = new OcorrenciaModel();
        this.ocorrencia.data = new Date();
        this.txtData = this.ocorrencia.data.toLocaleString();
    }

    registrarOcorrencia() {
        if (this.carro != null) {
            this.ocorrencia.carroID = this.carro.id;
            this.ocorrencia.data = new Date(this.txtData);

            if (this.cadastrandoOcorrencia) this.cadastrandoOcorrencia.emit(this.ocorrencia);

            this.ocorrenciaService.save(this.ocorrencia).then((ocorrencia) => {
                if (this.ocorrenciaCadastrada) this.ocorrenciaCadastrada.emit(ocorrencia);
            });

            this.ocorrencia = new OcorrenciaModel();
        }
    }
}