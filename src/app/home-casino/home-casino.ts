import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-casino',
  imports: [],
  templateUrl: './home-casino.html',
  styleUrl: './home-casino.css'
})
export class HomeCasino {
private router = inject(Router);

  inizioGioco(giocoScelto:string){
    switch(giocoScelto){
    case 'cartaAlta':
      this.router.navigate(['/cartaAlta']);
      break;
     
    case 'poker3':
      this.router.navigate(['/poker3']);
      break;

    default:
      this.router.navigate(['']);
    }
    
    
  }
}
