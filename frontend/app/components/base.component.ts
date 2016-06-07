// Core
import { ElementRef } from '@angular/core'

/** Enum de Efeitos do Show/Hide do JQuery UI. */
export enum Effects {
    Blind,
    Bounce,
    Clip,
    Drop,
    Explode,
    Fade,
    Fold,
    Highlight,
    Puff,
    Pulsate,
    Scale,
    Shake,
    Size,
    Slide
}

/** Extensão do Enumerator de Efeitos. */
export module Effects {
    /** Converter Effect de "int" para "string". */
    export function toString(effect: Effects): string {
        return Effects[effect].toLowerCase();
    }
}

/** Classe abstrata de Base contendo métodos de extensão para Component. */
export abstract class BaseComponent {

    /** Configuração de efeito do Show/Hide. */
    public effectConfig: EffectConfig = new EffectConfig();

    /**
     * Método para mostrar de forma animada um elemento.
     * @param jquerySelector  Seletor do JQuery (Em caso de ElementRef, é recuperado o NativeElement).
     * @param complete Função opcional de callback.
    */
    protected show(jquerySelector: any, complete?: () => void): void {
        if (jquerySelector instanceof ElementRef) jquerySelector = jquerySelector.nativeElement;

        // SetTimeOut serve para esperar o Angular lidar com o ngIf, já que ainda não temos ngAnimate.
        setTimeout(() => {
            $(jquerySelector).show(Effects.toString(this.effectConfig.Effect), this.effectConfig.Option, this.effectConfig.Duration, complete);
        }, 1);
    }

    /**
     * Método para esconderde forma animada um elemento.
     * @param jquerySelector  Seletor do JQuery (Em caso de ElementRef, é recuperado o NativeElement).
     * @param complete Função opcional de callback.
    */
    protected hide(jquerySelector: any, complete?: () => void): void {
        if (jquerySelector instanceof ElementRef) jquerySelector = jquerySelector.nativeElement;

        // SetTimeOut serve para esperar o Angular lidar com o ngIf, já que ainda não temos ngAnimate.
        setTimeout(() => {
            $(jquerySelector).hide(Effects.toString(this.effectConfig.Effect), this.effectConfig.Option, this.effectConfig.Duration, complete);
        }, 1);
    }

    /** 
     * Método para realizar efeito em um elemento.
     * @param jquerySelector Seletor do JQuery (Em caso de ElementRef, é recuperado o NativeElement).
     * @param effect Efeito selecionado.
     * @param option Opções extras para o efeito.
     * @param duration Duração do efeito.
     * @param complete Callback do efeito.
     */
    protected effect(jquerySelector: any, effect: Effects, option?: any, duration?: number, complete?: () => void): void {
        if (jquerySelector instanceof ElementRef) jquerySelector = jquerySelector.nativeElement;

        setTimeout(() => {
            $(jquerySelector).effect(Effects.toString(effect), option, duration, complete);
        }, 1);
    }
}

/** Configuração do Efeito do Show/Hide para o Componente. */
export class EffectConfig {

    /** Efeito selecionado. */
    public Effect: Effects = Effects.Blind;

    /** Opções do Efeito. */
    public Option: any;

    /** Duração do Efeito. Padrão 1000ms. */
    public Duration: number = 1000;
}  