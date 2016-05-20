// Importar @Component Decorator do Core do Angular 2.
import { Component } from '@angular/core';

// Decorar proxima classe com AppComponent
@Component({
  
  // Definir Seletor CSS.
  selector: 'my-app',
  
  // Definir template da pagina.
  template: '<h1>My First Angular 2 App</h1>'
  
})
// Criar class AppComponent exportando ela para acesso "externo" com "import"
export class AppComponent { 
  
}