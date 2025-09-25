import { Component} from '@angular/core';
import { Card } from '../interfaccia/card';
import { CartaAlta } from '../logicaCarte/carta-alta';

@Component({
  selector: 'app-campo-gioco',
  imports: [],
  templateUrl: './campo-gioco.html',
  styleUrl: './campo-gioco.css'
})
export class CampoGioco {
  //mettere un if per vedere il gioco e in base  aquesto attribiusci metodi e attributi degli ogg
  cartaAltaLogica:CartaAlta= new CartaAlta;

  //var che rappresenta la carta utente 
  semeCartaUtente!:Card;
  numeroCartaUtente!:Card[];
  punteggioUtente!:number;

  //var che rappresenta la carta PC
  semeCartaPc!:Card;
  numeroCartaPc!:Card[];
  punteggioPc!:number;

  //variabile che rappresenta il vincitore
  flagVincitore!:number;

  //array per far vedere che il mazzo sta diminuendo
  numeroCarteVisualizzazioneMazzo!:number[]; 
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


