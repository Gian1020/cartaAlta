import { Component, LOCALE_ID } from '@angular/core';
import { Card } from './interfaccia/card';

@Component({
  selector: 'app-carta-alta',
  imports: [],
  templateUrl: './carta-alta.html',
  styleUrl: './carta-alta.css'
})
export class CartaAlta {
  
  mazzo: Card[] = [];
  cartaUtente: Card = {};
  cartaPc: Card = {}
  magCartaGiocatore: number = 0;
  contatore: number = 0;
  punteggio1: number = 0;
  punteggio2: number = 0;
  registroCarteUtente: Card[] = [];
  registroCartePc: Card[] = [];
  contatoreClick:number = 0;
  numeroCarteVisualizzazioneMazzo:number[]=[1,2,3,4,5,6,7,8,9,10,11,12]

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

  distribuisciCarta() {
    if (this.mazzo.length !== 0) {
      this.contatoreClick++;
      this.cartaUtente = this.mazzo[0];
      this.mazzo.shift();
      this.registroCarteUtente.push(this.cartaUtente);
      this.cartaPc = this.mazzo[0];
      this.mazzo.shift();
      this.registroCartePc.push(this.cartaPc);
      this.sfoltisciMazzo();
      this.checkWinner(this.cartaUtente, this.cartaPc);
    }
    
    
  }

  sfoltisciMazzo(){
    if(this.contatoreClick%2==0){
      this.numeroCarteVisualizzazioneMazzo.pop();
    }
  }

  checkWinner(carta1: Card, carta2: Card) {

    if (carta1.numero !== undefined && carta2.numero !== undefined && carta1.simbolo !== undefined && carta2.simbolo !== undefined) {
      if (carta1.numero > carta2.numero) {
        this.magCartaGiocatore = 1;
        this.punteggio1++;
      }
      else if (carta1.numero == carta2.numero) {
        if (carta1.simbolo > carta2.simbolo) {
          this.magCartaGiocatore = 1;
          this.punteggio1++;
        }
        else {
          this.magCartaGiocatore = 2;
          this.punteggio2++;
        };
      }
      else {
        this.magCartaGiocatore = 2
        this.punteggio2++;
      };
    }

  }
}


