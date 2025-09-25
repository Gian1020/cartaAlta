import { Component, LOCALE_ID } from '@angular/core';
import { Card } from './interfaccia/card';
import { CartaAlta } from '../../logicaCarte/carta-alta';

@Component({
  selector: 'app-campo-gioco',
  imports: [],
  templateUrl: './campo-gioco.html',
  styleUrl: './campo-gioco.css'
})
export class CampoGioco {

  cartaAltaLogica:CartaAlta= new CartaAlta;
  
  mazzo: Card[] = [];
  
  ngOnInit() {
    this.creaCarte();
    this.mischia();
  }

  creaCarte() {
    for (let semi = 0; semi < 4; semi++) {
      for (let numeri = 1; numeri <= 13; numeri++) {
        let carta: Card = { numero: numeri, simbolo: semi };
        this.mazzo.push(carta);
      }
    }
  }

  mischia() {
    for (let indexCarta in this.mazzo) {
      let indexCasuale: number = Math.floor(Math.random() * this.mazzo.length);
      let varAppoggio = this.mazzo[indexCarta];
      this.mazzo[indexCarta] = this.mazzo[indexCasuale];
      this.mazzo[indexCasuale] = varAppoggio;
    }
  }

  
}


