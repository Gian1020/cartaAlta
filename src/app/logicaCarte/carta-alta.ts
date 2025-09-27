import { Injectable } from "@angular/core";
import { Card } from "../campo-gioco/interfaccia/Card";
import { BehaviorSubject } from "rxjs";
import { StatoCarta } from "../campo-gioco/interfaccia/oggettoCartaAlta";
@Injectable({ providedIn: 'root' })

export class CartaAlta {
  cartaUtente: Card[] = [];
  cartaPc: Card[] = [];
  contatore: number = 0;
  punteggio1: number = 0;
  punteggio2: number = 0;
  registroCarteUtente: Card[] = [];
  registroCartePc: Card[] = [];
  contatoreClick: number = 0;
  numeroCarteVisualizzazioneMazzo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  chiHaVinto: number = 0;
  vincitore!: string;
  country!: string;
  punteggioVincitore!: string;
  classeCard: string = "";

  /*
   private _stato = new BehaviorSubject<StatoCarta>({
    cartaUtente: [],
    cartaPc: [],
    contatore: 0,
    punteggio1: 0,
    punteggio2: 0,
    registroCarteUtente: [],
    registroCartePc: [],
    contatoreClick: 0,
    numeroCarteVisualizzazioneMazzo: [1,2,3,4,5,6,7,8,9,10,11,12],
    chiHaVinto: 0,
    vincitore: '',
    country: '',
    punteggioVincitore: '',
    classeCard: ''
  });
  */

  distribuisciCarta(mazzo: Card[]) {
    if (mazzo.length === 0) return;
      this.contatoreClick++;

      // carta utente
      const cartaU = mazzo.shift()!;
      this.cartaUtente.push(cartaU);
      this.registroCarteUtente.push(cartaU);

      // carta pc
      const cartaP = mazzo.shift()!;
      this.cartaPc.push(cartaP);
      this.registroCartePc.push(this.cartaPc[0]);

      this.sfoltisciMazzo();
      this.checkWinnerRound(this.cartaUtente[0], this.cartaPc[0]);
  }

  sfoltisciMazzo() {
    if (this.contatoreClick % 2 == 0) {
      this.numeroCarteVisualizzazioneMazzo.pop();
    }
  }

  checkWinnerRound(carta1: Card, carta2: Card) {

    if (this.contatoreClick == 26) {
      this.checkWinner();
    }

    if (carta1.numero! > carta2.numero!) {
      this.punteggio1++;
    }
    else if (carta1.numero == carta2.numero) {
      if (carta1.simbolo! > carta2.simbolo!) {
        this.punteggio1++;
      }
      else { this.punteggio2++; }
    }
    else {
      this.punteggio2++;
    }

  }

  checkWinner() {
    if (this.punteggio1 > this.punteggio2) {
      this.chiHaVinto = 1;
      this.vincitore = "Utente";
      this.punteggioVincitore = "Punteggio: " + `${this.punteggio1}`;
      this.country = "Italy";
      this.classeCard = "card-utente";
    }
    else if (this.punteggio1 < this.punteggio2) {
      this.chiHaVinto = 2;
      this.vincitore = "Utente_PC";
      this.punteggioVincitore = "Punteggio: " + `${this.punteggio2}`;
      this.country = "Spazio";
      this.classeCard = "card-pc";
    }


    else if ((this.punteggio1 == this.punteggio2)) {
      this.chiHaVinto = 3;
      this.vincitore = "Patta";
      this.punteggioVincitore = "Punteggio: PARI";
      this.classeCard = "card-pc";
    }
  }
}
