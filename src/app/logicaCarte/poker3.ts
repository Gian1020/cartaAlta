import { Injectable } from "@angular/core";
import { Card } from "../campo-gioco/interfaccia/Card";
import { CombinazioneMax } from "../campo-gioco/interfaccia/ComboMaxPoker";

@Injectable({ providedIn: 'root' })
export class Poker3 {
    carteUtente: Card[] = [];
    cartePc: Card[] = [];
    comboMaxUtente!: CombinazioneMax;
    comboMaxPc!: CombinazioneMax;
    flagWinnerRound: number = 0;
    flagVincitorePartita: number = 0;
    chiHaVinto: string = "";
    punteggioVincitore: string = "";
    country: string = "";
    punteggioUtene: number = 0;
    punteggioPc: number = 0;
    classeCard: string = "";
    contatoreClick:number=0;

    /*  0 --> nessun vincitore ancora decretetato
        1 --> vincitore Utente 
        2 --> vincitore Pc
        3 --> split
    */

    distribuisci(mazzo: Card[]) {
        this.cartePc=[];
        this.carteUtente=[];
        if (mazzo.length > 5) {
            this.contatoreClick++;
            console.log(this.contatoreClick,"click");
            
           /* this.cartePc = [
                {
                    numero: 4,
                    simbolo: 0

                },
                {
                    numero: 3,
                    simbolo: 0

                }, {
                    numero: 5,
                    simbolo: 0

                }];
            this.carteUtente = [{
                numero: 4,
                simbolo: 0
            }, {
                numero: 2,
                simbolo: 0
            },
            {
                numero: 3,
                simbolo: 0
            },
            ];*/
            for (let i = 0; i < 3; i++) {
                
                // carta utente
                const cartaU = mazzo.shift()!;
                this.carteUtente.push(cartaU);

                // carta pc
                const cartaP = mazzo.shift()!;
                this.cartePc.push(cartaP);
            }
            //funzione che controlla la vi
            this.checkWinnerRound(this.controlloMaxPunteggio(this.carteUtente), this.controlloMaxPunteggio(this.cartePc));
            this.vincitoreFinale();

        }
    }

    controlloMaxPunteggio(carteGiocatoreDaControllare: Card[]): CombinazioneMax {
        //inserire il fatto che l asso puo fare la scala con A K Q
        let chiControlliamo = [...carteGiocatoreDaControllare];
        chiControlliamo.sort((a, b) => (a.numero ?? 0) - (b.numero ?? 0));
        chiControlliamo.every(el => el !== undefined);

        switch (true) {
            case (this.controlloSeScala(chiControlliamo) && this.controlloSimbolo(chiControlliamo)):
                return {
                    combo: 5,
                    cards: chiControlliamo
                }

            case (chiControlliamo[0].numero == chiControlliamo[1].numero && chiControlliamo[0].numero == chiControlliamo[2].numero):
                return {
                    combo: 4,
                    cards: chiControlliamo
                }

            //controllare e gestire meglio il caso A 2 3
            case (this.controlloSeScala(chiControlliamo)):
                if (chiControlliamo[chiControlliamo.length - 1].numero == 14) {
                    [chiControlliamo[chiControlliamo.length - 2], chiControlliamo[chiControlliamo.length - 1]] =
                        [chiControlliamo[chiControlliamo.length - 1], chiControlliamo[chiControlliamo.length - 2]];
                }
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
        //controllo scala tranne caso A 2 3
        let contatore = 0;
        for (let i = 0; i < mano.length - 1; i++) {
            if ((mano[i].numero ?? 0) == (mano[i + 1].numero ?? 0) - 1) {
                contatore++;
            }
        }
        if (contatore == 2) return true;
        let arr = [];
        for (let carte of mano) {
            arr.push(carte.numero);
        }
        if (arr.includes(14) && arr.includes(2) && arr.includes(3)) {
            return true;
        }

        return false;
    }

    controlloSimbolo(mano: Card[]): boolean {
        let contatore: number = 0;
        for (let i = 0; i < mano.length - 1; i++) {
            if ((mano[i].simbolo ?? 0) == (mano[i + 1].simbolo ?? 0)) {
                contatore++
            }
        }
        if (contatore === mano.length - 1) {
            return true;
        }
        else return false;
    }

    vincitoreFinale() {
        if (this.contatoreClick==8) {
            if(this.punteggioUtene > this.punteggioPc){
            this.flagVincitorePartita = 1;
            this.chiHaVinto = "Utente";
            this.punteggioVincitore = "Punteggio: " + `${this.punteggioUtene}`;
            this.country = "Italy";
            this.classeCard = "card-utente";
        }
        else if (this.punteggioUtene < this.punteggioPc) {
            this.flagVincitorePartita = 2;
            this.chiHaVinto = "Utente_PC";
            this.punteggioVincitore = "Punteggio: " + `${this.punteggioPc}`;
            this.country = "Spazio";
            this.classeCard = "card-pc";
        }


        else if ((this.punteggioUtene == this.punteggioPc)) {
            this.flagVincitorePartita = 3;
            this.chiHaVinto = "Patta";
            this.punteggioVincitore = "Punteggio: PARI";
            this.classeCard = "card-pc";
        }}
    }

    checkWinnerRound(comboMaxUtente: CombinazioneMax, comboMaxPc: CombinazioneMax) {
        console.log(comboMaxUtente, "utente");
        console.log(comboMaxPc, "pc");
        console.log(this.punteggioUtene);
        console.log(this.punteggioPc);
        
        
        //da controllare con log tutti i pareggi
        switch (true) {
            //controllo combo --> vincitore Utente
            case (comboMaxUtente.combo > comboMaxPc.combo): {
                console.log("Ha vinto l utente");

                this.flagWinnerRound = 1;
                this.punteggioUtene++;
                break;
            }
            //controllo combo --> vincitore Pc
            case (comboMaxUtente.combo < comboMaxPc.combo): {
                console.log("Ha vinto il pc");
                this.flagWinnerRound = 2;
                this.punteggioPc++;
                break;
            }
            //controllo combo --> pari
            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 5):
                {
                    if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1].numero! > comboMaxPc.cards[comboMaxPc.cards.length - 1].numero!) {
                        console.log("Ha vinto l utente con scala Reale");
                        this.flagWinnerRound = 1;
                        this.punteggioUtene++;
                    }
                    else if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1].numero == comboMaxPc.cards[comboMaxPc.cards.length - 1].numero) {
                        if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1].simbolo! > comboMaxPc.cards[comboMaxPc.cards.length - 1].simbolo!) {
                            console.log("Ha vinto l utente con scala Reale");
                            this.flagWinnerRound = 1;
                            this.punteggioUtene++;
                        }
                        else {
                            console.log("Ha vinto l Pc con scala Reale");
                            this.flagWinnerRound = 2;
                            this.punteggioPc++;
                        }
                    }
                    else {
                        console.log("Ha vinto l Pc con scala Reale");
                        this.flagWinnerRound = 2;
                        this.punteggioPc++;
                    }
                    break;
                }
            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 4):
            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 3):
                {
                    if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1].numero! > comboMaxPc.cards[comboMaxPc.cards.length - 1].numero!) {
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
                    if (comboMaxUtente.cards[0].simbolo! > comboMaxPc.cards[0].simbolo!) {
                        this.flagWinnerRound = 1;
                        this.punteggioUtene++;
                    }
                    else if (comboMaxUtente.cards[0].simbolo! < comboMaxPc.cards[0].simbolo!) {
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
                if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1].numero! > comboMaxPc.cards[comboMaxPc.cards.length - 1].numero!) {
                    this.flagWinnerRound = 1;
                    this.punteggioUtene++;
                }
                else if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1].numero! < comboMaxPc.cards[comboMaxPc.cards.length - 1].numero!) {
                    this.flagWinnerRound = 2;
                    this.punteggioPc++;
                }
                else {
                    if (comboMaxUtente.cards[comboMaxUtente.cards.length - 2].numero! > comboMaxPc.cards[comboMaxPc.cards.length - 2].numero!) {
                        this.flagWinnerRound = 1;
                        this.punteggioUtene++;
                    }
                    else if (comboMaxUtente.cards[comboMaxUtente.cards.length - 2].numero! < comboMaxPc.cards[comboMaxPc.cards.length - 2].numero!) {
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



