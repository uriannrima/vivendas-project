import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BaseComponent, Effects } from './base.component';
import { VisitaService } from '../services/visita.service';
import { ConfiguracaoService } from '../services/configuracao.service';
import { VisitaModel } from '../models/visita.model';

@Component({
    selector: 'visitas-ativas',
    templateUrl: 'app/templates/visitas-ativas.template.html',
})
export class VisitasAtivasComponent extends BaseComponent implements OnInit {

    @Output() visitaRemovida = new EventEmitter<VisitaModel>();
    @Output() listaVazia = new EventEmitter<string>();
    @Input() visitas: VisitaModel[];

    public tempoMaximo: number = 2;

    constructor(private visitaService: VisitaService, private configuracaoService: ConfiguracaoService) {
        super();
        this.effectConfig.Effect = Effects.Fade;
    }

    ngOnInit() {
        this.tempoMaximo = this.configuracaoService.tempoMaximo;
        this.inicializarContador();
    }

    inicializarContador() {
        setInterval(() => {
            this.visitas.forEach((visita) => {
                visita.atualizarPermanencia();
            });
        }, 1000);
    }

    registrarSaida(visita: VisitaModel, trElement: any, index: number) {
        visita.saida = new Date();
        this.visitaService.save(visita).then(visitaAtualizada => {
            this.hide(trElement, () => {

                let removida = this.visitas.splice(index, 1)[0];
                if (this.visitaRemovida) this.visitaRemovida.emit(removida);
                if (this.visitas.length == 0 && this.listaVazia) {
                    this.listaVazia.emit(null);
                }

                //this.visitas = this.visitas.filter((visitaAtiva) => {
                //    return visitaAtiva.id != visita.id;
                //});
            });
        });
    }
}