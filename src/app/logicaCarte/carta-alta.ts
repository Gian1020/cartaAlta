import { Injectable } from "@angular/core";
import { Card } from "../campo-gioco/interfaccia/Card";

@Injectable({ providedIn: 'root' })

export class CartaAlta {
  //carte Utente
  cartaUtente: Card[] = [];
  punteggio1: number = 0;
  registroCarteUtente: Card[] = [];

  //carte Pc
  cartaPc: Card[] = [];
  punteggio2: number = 0;
  
  //sfoltisce mazzo
  contatoreClick: number = 0;
  numeroCarteVisualizzazioneMazzo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  //vincitore
  flagVincitorePartita: number = 0;
  vincitore!: string;
  country!: string;
  punteggioVincitore!: string;
  classeCard: string = "";
  
  //vignetta
  commentoVincitoreRound!: string;
  valoreSemeStringa!: string;
  simboli = ["♠", "♣", "♦", "♥"];
  nomi: { [key: number]: string } = { 11: "J", 12: "Q", 13: "K", 14: "A" };


  distribuisciCarta(mazzo: Card[]) {
    if (mazzo.length === 0) return;
    this.cartaUtente = [];
    this.cartaPc = [];
    this.contatoreClick++;

    // carta utente
    const cartaU = mazzo.shift()!;
    this.cartaUtente.push(cartaU);
    
    // carta pc
    const cartaP = mazzo.shift()!;
    this.cartaPc.push(cartaP);

    this.sfoltisciMazzo();
    this.checkWinnerRound(this.cartaUtente[this.cartaUtente.length - 1], this.cartaPc[this.cartaPc.length - 1]);
  }

  sfoltisciMazzo() {
    if (this.contatoreClick % 2 == 0) {
      this.numeroCarteVisualizzazioneMazzo.pop();
    }
  }

  checkWinnerRound(carta1: Card, carta2: Card) {

    if (carta1.numero! > carta2.numero!) {
      this.simboloSeme(carta1);
      this.commentoVincitoreRound = "Ha vinto Utente con ";
      this.punteggio1++;

    }
    else if (carta1.numero! === carta2.numero!) {
      if (carta1.seme! > carta2.seme!) {
        this.simboloSeme(carta1);
        this.commentoVincitoreRound = "Ha vinto Utente con ";
        this.punteggio1++;

      }
      else {
        this.simboloSeme(carta2);
        this.commentoVincitoreRound = "Ha vinto Pc con ";
        this.punteggio2++;

      }
    }
    else {
      this.simboloSeme(carta2);
      this.commentoVincitoreRound = "Ha vinto Pc con ";
      this.punteggio2++;

    }
    this.commentoVincitoreRound += this.valoreSemeStringa;

    if (this.contatoreClick == 26) {
      this.checkWinner();
    }
  }


  simboloSeme(card: Card) {
    const nome = this.nomi[card.numero!] || card.numero;
    this.valoreSemeStringa = `${nome}${this.simboli[card.seme!]}`;
  }

  checkWinner() {
    if (this.punteggio1 > this.punteggio2) {
      this.flagVincitorePartita = 1;
      this.vincitore = "Utente";
      this.punteggioVincitore = "Punteggio: " + `${this.punteggio1}`;
      this.country = "Italy";
      this.classeCard = "card-utente";

    }
    else if (this.punteggio1 < this.punteggio2) {
      this.flagVincitorePartita = 2;
      this.vincitore = "Utente_PC";
      this.punteggioVincitore = "Punteggio: " + `${this.punteggio2}`;
      this.country = "Spazio";
      this.classeCard = "card-pc";

    }


    else if ((this.punteggio1 == this.punteggio2)) {
      this.flagVincitorePartita = 3;
      this.vincitore = "Patta";
      this.punteggioVincitore = "Punteggio: PARI";
      this.classeCard = "card-pc";
    }
  }
}
