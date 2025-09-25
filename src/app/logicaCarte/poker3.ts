import { Card } from "../interfaccia/card";
import { combinazioneMax } from "../interfaccia/comboMaxPoker";

export class Poker3 {
    cartaUtente: Card = {};
    cartaPc: Card = {};
    carteUtente: Card[] = [];
    cartePc: Card[] = [];
    comboMaxUtente!: combinazioneMax;
    comboMaxPc!: combinazioneMax;
    flag: number = 0;

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

    controlloMaxPunteggio(chiControlliamo: Card[]): combinazioneMax {

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

    checkWinner(comboMaxUtente: combinazioneMax, comboMaxPc: combinazioneMax) {
        switch (true) {
            case (comboMaxUtente.combo > comboMaxPc.combo): {
                this.flag = 1;
                break;
            }

            case (comboMaxUtente.combo < comboMaxPc.combo): {
                this.flag = 2;
                break;
            }

            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 5):
            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 4):
            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 3):
            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 2):
                {
                    if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1] > comboMaxUtente.cards[comboMaxUtente.cards.length - 1]) {
                        this.flag = 1;
                    }
                    else this.flag = 2;
                    break;
                }

            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 1): {
                if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1] > comboMaxUtente.cards[comboMaxUtente.cards.length - 1]) {
                    this.flag = 1;
                }
                else if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1] > comboMaxUtente.cards[comboMaxUtente.cards.length - 1]) {
                    this.flag = 2;
                }
                else {
                    if (comboMaxUtente.cards[0] > comboMaxPc.cards[0]) {
                        this.flag = 1;
                    }
                    else if (comboMaxUtente.cards[0] < comboMaxPc.cards[0]) {
                        this.flag = 2;
                    }
                    else {
                        this.flag = 3;
                    }
                }
                break;
            }

            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 0): {
                if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1] > comboMaxUtente.cards[comboMaxUtente.cards.length - 1]) {
                    this.flag = 1;
                }
                else if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1] > comboMaxUtente.cards[comboMaxUtente.cards.length - 1]) {
                    this.flag = 2;
                }
                else {
                    if (comboMaxUtente.cards[1] > comboMaxPc.cards[1]) {
                        this.flag = 1;
                    }
                    else if (comboMaxUtente.cards[1] < comboMaxPc.cards[1]) {
                        this.flag = 2;
                    }
                    else {
                        if (comboMaxUtente.cards[0] > comboMaxPc.cards[0]) {
                            this.flag = 1;
                        }
                        else if (comboMaxUtente.cards[0] < comboMaxPc.cards[0]) {
                            this.flag = 2;
                        }
                        else{
                            this.flag=3;
                        }
                    }
                }
                break;
            }


        }
    }
}



