import { Component, OnInit } from '@angular/core';

import { PesquisaCarroComponent } from './pesquisa-carro.component';

import { OcorrenciaModel } from '../models/ocorrencia.model';

import { FormatarDataDirective } from '../directives/formatar-data.directive';

@Component({
    selector: 'cadastro-ocorrencia',
    templateUrl: 'app/templates/cadastro-ocorrencia.template.html',
    directives: [PesquisaCarroComponent, FormatarDataDirective]
})
export class CadastroOcorrenciaComponent implements OnInit {
    public ocorrencia: OcorrenciaModel = null;

    ngOnInit() {
        this.ocorrencia = new OcorrenciaModel();
    }
}