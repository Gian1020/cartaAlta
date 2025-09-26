import { Card } from "../campo-gioco/interfaccia/Card";
import { CombinazioneMax } from "../campo-gioco/interfaccia/ComboMaxPoker";

export class Poker3 {
    cartaUtente: Card = {};
    cartaPc: Card = {};
    carteUtente: Card[] = [];
    cartePc: Card[] = [];
    comboMaxUtente!: CombinazioneMax;
    comboMaxPc!: CombinazioneMax;
    flagWinnerRound: number = 0;
    flagVincitorePartita:number=0;
    chiHaVinto:string="";
    punteggioVincitore:string="";
    country:string="";
    punteggioUtene!: number;
    punteggioPc!: number;
    classeCard:string="";

    /*  0 --> nessun vincitore ancora decretetato
        1 --> vincitore Utente 
        2 --> vincitore Pc
        3 --> split
    */

    distribuisci(mazzo: Card[]) {
        if (mazzo.length > 5) {
            for (let i = 0; i < 3; i++) {
                this.carteUtente.push(mazzo[0]);
                mazzo.shift();
                this.cartePc.push(mazzo[0]);
                mazzo.shift();
            }
        }
    }

    controlloMaxPunteggio(chiControlliamo: Card[]): CombinazioneMax {
        //inserire il fatto che l asso puo fare la scala con A K Q
        chiControlliamo.every(el => el !== undefined);
        chiControlliamo.sort((a, b) => (a.numero ?? 0) - (b.numero ?? 0));

        switch (true) {

            case this.controlloSeScala(chiControlliamo) && this.controlloSimbolo(chiControlliamo):
                return {
                    combo: 5,
                    cards: chiControlliamo
                }

            case (chiControlliamo[0].numero == chiControlliamo[1].numero && chiControlliamo[0].numero == chiControlliamo[2].numero):
                return {
                    combo: 4,
                    cards: chiControlliamo
                }


            case (this.controlloSeScala(chiControlliamo)):
                return {
                    combo: 3,
                    cards: chiControlliamo
                }


            case (this.controlloSeScala(chiControlliamo)):
                return {
                    combo: 3,
                    cards: chiControlliamo
                }

            case (this.controlloSeScala(chiControlliamo)):
                return {
                    combo: 3,
                    cards: chiControlliamo
                }

            case (this.controlloSimbolo(chiControlliamo)):
                return {
                    combo: 2,
                    cards: chiControlliamo
                }

            //case coppia
            case (this.controlloCoppia(chiControlliamo)):
                return {
                    combo: 1,
                    cards: chiControlliamo
                }

            //default carta alta
            default:
                return {
                    combo: 0,
                    cards: chiControlliamo
                }
        }
    }

    controlloCoppia(mano: Card[]) {
        for (let i = 0; i < mano.length - 1; i++) {
            for (let j = i + 1; j < mano.length; j++) {
                if ((mano[i].numero ?? 0) === (mano[j].numero ?? 0)) {

                    // Prendo la coppia
                    const coppia = [mano[i], mano[j]];

                    // Rimuovo dal mazzo le due carte
                    mano.splice(j, 1); // attenzione: rimuovo prima quella con indice più alto
                    mano.splice(i, 1);

                    // Le metto in fondo
                    mano.push(...coppia);


                    return true;
                }
            }
        }
        return false;
    }


    controlloSeScala(mano: Card[]): boolean {
        for (let i = 0; i < mano.length - 1; i++) {
            if ((mano[i].numero ?? 0) !== (mano[i + 1].numero ?? 0) + 1) {
                return false;
            }
        }
        return true;
    }

    controlloSimbolo(mano: Card[]): boolean {
        let contatore: number = 0;
        for (let i = 0; i < mano.length - 1; i++) {
            if ((mano[i].simbolo ?? 0) == (mano[i + 1].simbolo ?? 0)) {
                contatore++
            }
        }
        if (contatore = mano.length - 1) {
            return true;
        }
        else return false;
    }

    vincitoreFinale(){
    if(this.punteggioUtene>this.punteggioPc){
      this.flagVincitorePartita=1;
      this.chiHaVinto="Utente";
      this.punteggioVincitore="Punteggio: "+`${this.punteggioUtene}`;
      this.country= "Italy";
      this.classeCard = "card-utente";
    }
    else if(this.punteggioUtene<this.punteggioPc){
      this.flagVincitorePartita=2;
      this.chiHaVinto="Utente_PC";
      this.punteggioVincitore="Punteggio: "+`${this.punteggioPc}`;
      this.country= "Spazio";
      this.classeCard = "card-pc";
    }
    

    else if((this.punteggioUtene==this.punteggioPc)) {
      this.flagVincitorePartita=3;
      this.chiHaVinto="Patta";
      this.punteggioVincitore="Punteggio: PARI";
      this.classeCard = "card-pc";
    }
  }

    checkWinner(comboMaxUtente: CombinazioneMax, comboMaxPc: CombinazioneMax) {
        switch (true) {
            case (comboMaxUtente.combo > comboMaxPc.combo): {
                this.flagWinnerRound = 1;
                this.punteggioUtene++;
                break;
            }

            case (comboMaxUtente.combo < comboMaxPc.combo): {
                this.flagWinnerRound = 2;
                this.punteggioPc++;
                break;
            }
            // aggiungere controllo sul seme della scala reale

            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 5):
            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 4):
            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 3):
                {
                    if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1] > comboMaxUtente.cards[comboMaxUtente.cards.length - 1]) {
                        this.flagWinnerRound = 1;
                        this.punteggioUtene++;
                    }
                    else {
                        this.flagWinnerRound = 2;
                        this.punteggioPc++;
                    }
                    break;
                }

            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 2):
                {
                    if (comboMaxUtente.cards[0].simbolo !== undefined && comboMaxPc.cards[0].simbolo != undefined) {
                        if (comboMaxUtente.cards[0].simbolo > comboMaxPc.cards[0].simbolo) {
                            this.flagWinnerRound = 1;
                            this.punteggioUtene++;
                        }
                        else if (comboMaxUtente.cards[0].simbolo < comboMaxPc.cards[0].simbolo) {
                            this.flagWinnerRound = 2;
                            this.punteggioPc++;
                        }
                        else {
                            if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1] > comboMaxUtente.cards[comboMaxUtente.cards.length - 1]) {
                                this.flagWinnerRound = 1;
                                this.punteggioUtene++;
                            }
                            else {
                                this.flagWinnerRound = 2;
                                this.punteggioPc++;
                            }
                        }
                    }
                    break;
                }


            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 1): {
                if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1] > comboMaxUtente.cards[comboMaxUtente.cards.length - 1]) {
                    this.flagWinnerRound = 1;
                    this.punteggioUtene++;
                }
                else if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1] > comboMaxUtente.cards[comboMaxUtente.cards.length - 1]) {
                    this.flagWinnerRound = 2;
                    this.punteggioPc++;
                }
                else {
                    if (comboMaxUtente.cards[0] > comboMaxPc.cards[0]) {
                        this.flagWinnerRound = 1;
                        this.punteggioUtene++;
                    }
                    else if (comboMaxUtente.cards[0] < comboMaxPc.cards[0]) {
                        this.flagWinnerRound = 2;
                        this.punteggioPc++;
                    }
                    else {
                        this.flagWinnerRound = 3;
                    }
                }
                break;
            }

            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 0): {
                if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1] > comboMaxUtente.cards[comboMaxUtente.cards.length - 1]) {
                    this.flagWinnerRound = 1;
                    this.punteggioUtene++;
                }
                else if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1] > comboMaxUtente.cards[comboMaxUtente.cards.length - 1]) {
                    this.flagWinnerRound = 2;
                    this.punteggioPc++;
                }
                else {
                    if (comboMaxUtente.cards[1] > comboMaxPc.cards[1]) {
                        this.flagWinnerRound = 1;
                        this.punteggioUtene++;
                    }
                    else if (comboMaxUtente.cards[1] < comboMaxPc.cards[1]) {
                        this.flagWinnerRound = 2;
                        this.punteggioPc++;
                    }
                    else {
                        if (comboMaxUtente.cards[0] > comboMaxPc.cards[0]) {
                            this.flagWinnerRound = 1;
                            this.punteggioUtene++;
                        }
                        else if (comboMaxUtente.cards[0] < comboMaxPc.cards[0]) {
                            this.flagWinnerRound = 2;
                            this.punteggioPc++;
                        }
                        else {
                            this.flagWinnerRound = 3;
                        }
                    }
                }
                break;
            }
        }
    }
}



