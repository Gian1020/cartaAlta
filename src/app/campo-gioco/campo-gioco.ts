import { Component } from '@angular/core';
import { Card } from './interfaccia/Card';
import { CartaAlta } from '../logicaCarte/carta-alta';
import { Poker3 } from '../logicaCarte/poker3';
import { Router } from '@angular/router';
import { BlackJack } from '../logicaCarte/black-jack';

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

  contatoreClick!: number;

  //var che rappresenta la carta utente 
  carteUtente!: Card[];
  numeroCartaPc!: number;
  semeCartaPc!: number;
  punteggioUtente!: number;

  //var che rappresenta la carta PC
  cartePc!: Card[];
  semeCartaUtente!: number;
  numeroCartaUtente!: number;
  punteggioPc!: number;

  //variabile che rappresenta il vincitore
  flagVincitore!: number;

  punteggioVincitore!: string;
  vincitore!: string;
  country!: string;
  commentoVincitoreRound!: string;

  //variabile funzione click mazzo
  funzione!: any;

  //array per far vedere che il mazzo sta diminuendo
  numeroCarteVisualizzazioneMazzo!: number[];

  condizione!: number;

  valoreCondizioneBloccoClick!: number;

  logica: string = '';



  constructor(
    private router: Router,
    public cartaAlta: CartaAlta,
    public poker: Poker3,
    public bj:BlackJack
  ) { }


  //cartaAlta
  aggiornaCartaAlta() {
    //var che conta il click dell Utente
    this.contatoreClick = this.cartaAlta.contatoreClick;

    //var che rappresenta le carte del utente
    this.carteUtente = this.cartaAlta.cartaUtente;

    //var che rappresenta le carte del pc
    this.cartePc = this.cartaAlta.cartaPc;

    //var che rappresenta la carta utente 
    this.punteggioUtente = this.cartaAlta.punteggio1;

    //var che rappresenta la carta PC
    this.punteggioPc = this.cartaAlta.punteggio2;

    //variabile che rappresenta il vincitore
    this.flagVincitore = this.cartaAlta.flagVincitorePartita;

    //variabil che fa visualizzare il punteggio
    this.punteggioVincitore = this.cartaAlta.punteggioVincitore;
    this.vincitore = this.cartaAlta.vincitore;
    this.country = this.cartaAlta.country;

    this.commentoVincitoreRound = this.cartaAlta.commentoVincitoreRound;

    //array per far vedere che il mazzo sta diminuendo
    this.numeroCarteVisualizzazioneMazzo = this.cartaAlta.numeroCarteVisualizzazioneMazzo;

    //classe cardWinner
    this.classeCard = this.cartaAlta.classeCard;
  }

  caricaLogicaCartaAlta() {
    this.aggiornaCartaAlta()
    //metodo che fa cliccare le carte
    this.funzione = () => {
      this.cartaAlta.distribuisciCarta(this.mazzo);
      this.aggiornaCartaAlta()
    };

    this.condizione = this.mazzo.length;

    this.valoreCondizioneBloccoClick = 0;
  }

  //Poker

  aggiornaPoker() {

    //var che conta il click dell Utente
    this.contatoreClick = this.poker.contatoreClick;

    //var che rappresenta le carte Utente
    this.carteUtente = this.poker.carteUtente;

    //var che rappresenta le carte PC
    this.cartePc = this.poker.cartePc;

    //var che rappresenta il punteggio utente 
    this.punteggioUtente = this.poker.punteggioUtene;

    //var che rappresenta il punteggio PC
    this.punteggioPc = this.poker.punteggioPc;

    this.commentoVincitoreRound = this.poker.commentoVincitoreRound

    //variabile che rappresenta il vincitore
    this.flagVincitore = this.poker.flagVincitorePartita;


    //variabile che rappresenta il vincitore
    this.punteggioVincitore = this.poker.punteggioVincitore;
    this.vincitore = this.poker.chiHaVinto;
    this.country = this.poker.country;

    this.numeroCarteVisualizzazioneMazzo = this.poker.numeroCarteVisualizzazioneMazzo

    this.classeCard = this.poker.classeCard;
  }

  caricaLogicaPoker3() {
    this.aggiornaPoker();
     //var che rappresenta le carte Utente
    this.carteUtente = this.poker.carteUtente;

    //var che rappresenta le carte PC
    this.cartePc = this.poker.cartePc;


    //funzione per click distribuzione carte
    this.funzione = () => {
      this.poker.distribuisci(this.mazzo);

      this.aggiornaPoker();

    };

    //array per far vedere che il mazzo sta diminuendo
    //this.numeroCarteVisualizzazioneMazzo

    this.condizione = this.mazzo.length;

    this.valoreCondizioneBloccoClick = 8;
  }

  //blackJack

  caricaLogicaBlackJack(){
      //var che rappresenta le carte Utente
    this.carteUtente = this.bj.carteUtente;

    //var che rappresenta le carte PC
    this.cartePc = this.bj.cartePc;

    this.valoreCondizioneBloccoClick=0;
    this.funzione = () => {
      this.bj.distribuisci(this.mazzo);
    }
  }

  creaCarte() {
    for (let semi = 0; semi < 4; semi++) {
      for (let numeri = 2; numeri <= 14; numeri++) {
        let carta: Card = { numero: numeri, seme: semi };
        if (carta.seme == 0) {
          if (carta.numero == 14) {
            carta.code = "AS";
          }
          else if (carta.numero == 13) {
            carta.code = "KS";
          }
          else if (carta.numero == 12) {
            carta.code = "QS";
          }
          else if (carta.numero == 11) {
            carta.code = "JS";
          }
          else if (carta.numero! > 1 && carta.numero! < 11) {
            carta.code = carta.numero + "S";
          }
        }
        else if (carta.seme == 1) {
          if (carta.numero == 14) {
            carta.code = "AC";
          }
          else if (carta.numero == 13) {
            carta.code = "KC";
          }
          else if (carta.numero == 12) {
            carta.code = "QC";
          }
          else if (carta.numero == 11) {
            carta.code = "JC";
          }
          else if (carta.numero! > 1 && carta.numero! < 11) {
            carta.code = carta.numero + "C";
          }
        }
        else if (carta.seme == 2) {
          if (carta.numero == 14) {
            carta.code = "AD";
          }
          else if (carta.numero == 13) {
            carta.code = "KD";
          }
          else if (carta.numero == 12) {
            carta.code = "QD";
          }
          else if (carta.numero == 11) {
            carta.code = "JD";
          }
          else if (carta.numero! > 1 && carta.numero! < 11) {
            carta.code = carta.numero + "D";
          }
        }
        else {
          if (carta.numero == 14) {
            carta.code = "AH";
          }
          else if (carta.numero == 13) {
            carta.code = "KH";
          }
          else if (carta.numero == 12) {
            carta.code = "QH";
          }
          else if (carta.numero == 11) {
            carta.code = "JH";
          }
          else if (carta.numero! > 1 && carta.numero! < 11) {
            carta.code = carta.numero + "H";
          }
        }
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
    const currentRoute = this.router.url;

    if (currentRoute.includes('cartaAlta')) {
      this.creaCarte();
      this.mischia();
      this.logica = 'cartaAlta';
      this.caricaLogicaCartaAlta();
    }

    else if (currentRoute.includes('poker3')) {
      this.creaCarte();
      this.mischia();
      this.logica = 'poker3';
      this.caricaLogicaPoker3();
    }
    else if(currentRoute.includes('blackJack')){
      this.creaCarte();
      this.creaCarte();
      this.creaCarte();
      this.creaCarte();
      this.creaCarte();
      this.creaCarte();
      this.creaCarte();
      this.mischia();
      this.caricaLogicaBlackJack()
    }
  }
}



