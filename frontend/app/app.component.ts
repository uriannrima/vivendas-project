// Importar @Component Decorator do Core do Angular 2.
import { Component } from '@angular/core';

// Classe "modelo" de Heroi.
export class Hero {
	// ID do Heroi.
	id: number;

	// Nome do Heroi.
	name: string;
}

// Decorar proxima classe com AppComponent
@Component({

	// Definir Seletor CSS.
	selector: 'my-app',

	// Definir template da pagina.
	template: `
		<h1>{{title}}</h1>
		<h2>My Heroes</h2>
		<ul class="heroes">
			<!-- Template
				<li>
					each hero data goes here
				</li>
			-->
			<!-- 
				"*" cria um "master template" e a variavel "hero" vai manter dados para o "escopo" do template.
				"let" diz que "hero" é uma "template input variable", que pode ser acessada dentro do "template".
			 -->
			<li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
				<span class="badge">{{hero.id}}</span> {{hero.name}}
			</li>
		</ul>
		<!-- Ambos ngFor e ngIf são “structural directives” pois manipulam a estrutura do DOM. -->
		<div *ngIf="selectedHero">
			<h2>{{selectedHero.name}} details!</h2>
			<div><label>id: </label>{{selectedHero.id}}</div>
			<div>
				<label>name: </label>
				<!-- input value="{{selectedHero.name}}" placeholder="Name" -->
				<input [(ngModel)]="selectedHero.name" placeholder="Name">
			</div>
		</div>
	`,
	// Definir Styles do AppComponent
	styles: [`
		.selected {
			background-color: #CFD8DC !important;
			color: white;
		}
		.heroes {
			margin: 0 0 2em 0;
			list-style-type: none;
			padding: 0;
			width: 15em;
		}
		.heroes li {
			cursor: pointer;
			position: relative;
			left: 0;
			background-color: #EEE;
			margin: .5em;
			padding: .3em 0;
			height: 1.6em;
			border-radius: 4px;
		}
		.heroes li.selected:hover {
			background-color: #BBD8DC !important;
			color: white;
		}
		.heroes li:hover {
			color: #607D8B;
			background-color: #DDD;
			left: .1em;
		}
		.heroes .text {
			position: relative;
			top: -3px;
		}
		.heroes .badge {
			display: inline-block;
			font-size: small;
			color: white;
			padding: 0.8em 0.7em 0 0.7em;
			background-color: #607D8B;
			line-height: 1em;
			position: relative;
			left: -1px;
			top: -4px;
			height: 1.8em;
			margin-right: .8em;
			border-radius: 4px 0 0 4px;
		}
		`]
})
// Criar class AppComponent exportando ela para acesso "externo" com "import"
export class AppComponent {

	// Titulo da Pagina do Componente.
	title: string = 'Tour of Heroes';

	// Heroi selecionado.
	selectedHero: Hero;

	// Variavel "heroes" automaticamente recebe o tipo da variavel "HEROES".
	public heroes = HEROES;

	// Construtor do Componente.
	constructor() {

	}

	// Método invocado quando um héroi é selecionado.
	onSelect(hero: Hero) {
		this.selectedHero = hero;
	}
}

// Lista de Herois Temporária.
var HEROES: Hero[] = [
	{ "id": 11, "name": "Mr. Nice" },
	{ "id": 12, "name": "Narco" },
	{ "id": 13, "name": "Bombasto" },
	{ "id": 14, "name": "Celeritas" },
	{ "id": 15, "name": "Magneta" },
	{ "id": 16, "name": "RubberMan" },
	{ "id": 17, "name": "Dynama" },
	{ "id": 18, "name": "Dr IQ" },
	{ "id": 19, "name": "Magma" },
	{ "id": 20, "name": "Tornado" }
];