import { Component } from '@angular/core';
import { Card } from './interfaccia/Card';
import { CartaAlta } from '../logicaCarte/carta-alta';
import { Poker3 } from '../logicaCarte/poker3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campo-gioco',
  imports: [],
  templateUrl: './campo-gioco.html',
  styleUrl: './campo-gioco.css'
})
export class CampoGioco {
  giocoScelto!: string;
  mazzo: Card[] = [];
  classeCard!: string;

  //var che rappresenta la carta utente 
  carteUtente!: Card[];
  numeroCartaPc!: number | undefined;
  semeCartaPc!: number | undefined;
  punteggioUtente!: number;

  //var che rappresenta la carta PC
  cartePc!: Card[];
  semeCartaUtente!: number | undefined;
  numeroCartaUtente!: number | undefined;
  punteggioPc!: number;

  //variabile che rappresenta il vincitore
  flagVincitore!: number;

  punteggioVincitore!: string;
  vincitore!: string;

  //variabile funzione click mazzo
  funzione!: any;

  //array per far vedere che il mazzo sta diminuendo
  numeroCarteVisualizzazioneMazzo!: number[];

  condizione!: number;

  valoreCondizione!: number;

  logica: string = '';

  constructor(
    private router: Router,
    public cartaAlta: CartaAlta,
    public poker: Poker3
  ) { }

  caricaLogicaCartaAlta() {
    console.log(this.cartaAlta);

    //var che rappresenta le carte del utente
    this.carteUtente = this.cartaAlta.cartaUtente;

    //var che rappresenta le carte del pc
    this.cartePc = this.cartaAlta.cartaPc;

    //var che rappresenta la carta utente 
    this.punteggioUtente = this.cartaAlta.punteggio1;

    //var che rappresenta la carta PC
    this.punteggioPc = this.cartaAlta.punteggio2;

    //variabile che rappresenta il vincitore
    this.flagVincitore = this.cartaAlta.chiHaVinto;

    //variabil che fa visualizzare il punteggio
    this.punteggioVincitore = this.cartaAlta.punteggioVincitore;
    this.vincitore = this.cartaAlta.vincitore;

    //array per far vedere che il mazzo sta diminuendo
    this.numeroCarteVisualizzazioneMazzo = this.cartaAlta.numeroCarteVisualizzazioneMazzo;

    //classe cardWinner
    this.classeCard = this.cartaAlta.classeCard;

    //metodo che fa cliccare le carte
    this.funzione = () => {
      this.cartaAlta.distribuisciCarta(this.mazzo);
      //var che rappresenta le carte del utente
      this.carteUtente = this.cartaAlta.cartaUtente;

      //var che rappresenta le carte del pc
      this.cartePc = this.cartaAlta.cartaPc;

      //var che rappresenta la carta utente 
      this.punteggioUtente = this.cartaAlta.punteggio1;

      //var che rappresenta la carta PC
      this.punteggioPc = this.cartaAlta.punteggio2;

      //variabile che rappresenta il vincitore
      this.flagVincitore = this.cartaAlta.chiHaVinto;

      //variabil che fa visualizzare il punteggio
      this.punteggioVincitore = this.cartaAlta.punteggioVincitore;
      this.vincitore = this.cartaAlta.vincitore;

      //array per far vedere che il mazzo sta diminuendo
      this.numeroCarteVisualizzazioneMazzo = this.cartaAlta.numeroCarteVisualizzazioneMazzo;

      //classe cardWinner
      this.classeCard = this.cartaAlta.classeCard;
    };

    this.condizione = this.mazzo.length;

    this.valoreCondizione = 0;
  }

  caricaLogicaPoker3() {

    console.log(this.poker);

    //var che contiene 
    this.carteUtente = this.poker.carteUtente;

    this.cartePc = this.poker.cartePc;

    //var che rappresenta la carta utente 
    this.punteggioUtente = this.poker.punteggioUtene;

    //var che rappresenta la carta PC
    this.punteggioPc = this.poker.punteggioPc;

    //variabile che rappresenta il vincitore
    this.flagVincitore = this.poker.flagWinnerRound;

    //variabile che rappresenta il vincitore
    this.punteggioVincitore = this.poker.chiHaVinto;

    this.vincitore = this.poker.chiHaVinto;

    //funzione per click distribuzione carte
    this.funzione = () => {
      this.poker.distribuisci(this.mazzo);

      this.carteUtente = this.poker.carteUtente;

      this.cartePc = this.poker.cartePc;

      if (this.poker.flagWinnerRound != 3) {
        //var che rappresenta la carta utente 
        this.punteggioUtente = this.poker.punteggioUtene;

        //var che rappresenta la carta PC
        this.punteggioPc = this.poker.punteggioPc;}

        //variabile che rappresenta il vincitore
        this.flagVincitore = this.poker.flagWinnerRound;


        //variabile che rappresenta il vincitore
        this.punteggioVincitore = this.poker.chiHaVinto;
        this.vincitore = this.poker.chiHaVinto;
      
    };

    //array per far vedere che il mazzo sta diminuendo
    //this.numeroCarteVisualizzazioneMazzo

    this.condizione = this.mazzo.length;

    this.valoreCondizione = 6;
  }



  creaCarte() {
    for (let semi = 0; semi < 4; semi++) {
      for (let numeri = 2; numeri <= 14; numeri++) {
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
  ngOnInit() {
    this.creaCarte();
    this.mischia();

    const currentRoute = this.router.url;

    if (currentRoute.includes('cartaAlta')) {
      this.logica = 'cartaAlta';
      this.caricaLogicaCartaAlta();
    }
    else if (currentRoute.includes('poker3')) {
      this.logica = 'poker3';
      this.caricaLogicaPoker3();
    }
  }
}



