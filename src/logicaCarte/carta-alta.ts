import { Card } from "../app/campo-gioco/interfaccia/card";

export class CartaAlta {
      cartaUtente: Card = {};
      cartaPc: Card = {};
      magCartaGiocatore: number = 0;
      contatore: number = 0;
      punteggio1: number = 0;
      punteggio2: number = 0;
      registroCarteUtente: Card[] = [];
      registroCartePc: Card[] = [];
      contatoreClick:number = 0;
      numeroCarteVisualizzazioneMazzo:number[]=[1,2,3,4,5,6,7,8,9,10,11,12];
      chiHaVinto:number= 0;
      vincitore!:string;
      country!:string;
      punteggioVincitore!:string;
      classeCard:string="";

    distribuisciCarta(mazzo:Card[]) {
    if(mazzo.length !== 0) {
      this.contatoreClick++;
      this.cartaUtente = mazzo[0];
      mazzo.shift();
      this.registroCarteUtente.push(this.cartaUtente);
      this.cartaPc = mazzo[0];
      mazzo.shift();
      this.registroCartePc.push(this.cartaPc);
      this.sfoltisciMazzo();
      this.checkWinnerRound(this.cartaUtente, this.cartaPc);
    }
  }

  sfoltisciMazzo(){
    if(this.contatoreClick%2==0){
      this.numeroCarteVisualizzazioneMazzo.pop();
    }
  }

  checkWinnerRound(carta1: Card, carta2: Card) {

    if(this.contatoreClick==26){
      this.checkWinner();
    }

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

  checkWinner(){
    if(this.punteggio1>this.punteggio2){
      this.chiHaVinto=1;
      this.vincitore="Utente";
      this.punteggioVincitore="Punteggio: "+`${this.punteggio1}`;
      this.country= "Italy";
      this.classeCard = "card-utente";
    }
    else if(this.punteggio1<this.punteggio2){
      this.chiHaVinto=2;
      this.vincitore="Utente_PC";
      this.punteggioVincitore="Punteggio: "+`${this.punteggio2}`;
      this.country= "Spazio";
      this.classeCard = "card-pc";
    }
    

    else if((this.punteggio1==this.punteggio2)) {
      this.chiHaVinto=3;
      this.vincitore="Patta";
      this.punteggioVincitore="Punteggio: PARI";
      this.classeCard = "card-pc";
    }
  }
}
