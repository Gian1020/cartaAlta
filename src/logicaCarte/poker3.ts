import { Card } from "../app/campo-gioco/interfaccia/card";
import { combinazioneMax } from "../app/campo-gioco/interfaccia/comboMaxPoker";

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
    */

    distribuisciCarta(mazzo: Card[]) {
        if (mazzo.length !== 0) {
            for (let i = 0; i < 3; i++) {
                this.cartaUtente = mazzo[0];
                mazzo.shift();
                this.cartaPc = mazzo[0];
                mazzo.shift();
            }
        }
    }

    controlloMaxPunteggio(chiControlliamo: Card[]): combinazioneMax {

        if (chiControlliamo[0].numero !== undefined && chiControlliamo[1].numero !== undefined && chiControlliamo[2].numero !== undefined &&
            chiControlliamo[0].simbolo !== undefined && chiControlliamo[1].simbolo !== undefined && chiControlliamo[2].simbolo !== undefined
        ) {

            if (this.controlloScala(chiControlliamo) && chiControlliamo[0].simbolo == chiControlliamo[1].simbolo && chiControlliamo[0].simbolo == chiControlliamo[2].simbolo) {
                return {
                    combo: 5,
                    cards: chiControlliamo
                }
            }
            if (chiControlliamo[0].numero == chiControlliamo[1].numero && chiControlliamo[0].numero == chiControlliamo[2].numero) {
                return {
                    combo: 4,
                    cards: chiControlliamo
                }
            }
            if (this.controlloScala(chiControlliamo)) {
                return {
                    combo: 3,
                    cards: chiControlliamo
                }
            }

            if (chiControlliamo[0].simbolo == chiControlliamo[1].simbolo && chiControlliamo[0].simbolo == chiControlliamo[2].simbolo) {
                return {
                    combo: 2,
                    cards: chiControlliamo
                }
            }

            if (this.trovaCoppia(chiControlliamo)!=0 && this.trovaCoppia(chiControlliamo)!=undefined) {
                return {
                    combo: 1,
                    cards: chiControlliamo
                }
            }
            else {
                chiControlliamo.sort((a, b) => (a.numero ?? 0) - (b.numero ?? 0));
                return {
                    combo: 0,
                    cards: chiControlliamo
                }
            }
        }
        else {
            return {}
        }

    }

    controlloScala(carteDaControllare: Card[]): boolean {
        // Controlla che ci siano 3 carte e che tutte abbiano un numero
        if (carteDaControllare.length !== 3 || !carteDaControllare.every(c => c.numero !== undefined)) {
            return false;
        }

        // Estrai e ordina i numeri
        const numeri = carteDaControllare.map(c => c.numero!).sort((a, b) => a - b);

        // Controlla se i numeri sono consecutivi
        return numeri[1] === numeri[0] + 1 && numeri[2] === numeri[1] + 1;
    }

    trovaCoppia(mano: Card[]): number|undefined {
            if (mano[0].numero == mano[1].numero && mano[0].numero !== mano[2].numero) {
                return mano[0].numero;
            }
            else if (mano[1].numero == mano[2].numero && mano[2].numero !== mano[0].numero) {
                return mano[1].numero;
            }
            else if (mano[0].numero == mano[2].numero && mano[0].numero !== mano[1].numero) {
                return mano[0].numero;
            }
            else{
                return 0;
            }
        

    }
    checkWinner(comboMaxUtente: combinazioneMax, comboMaxPc: combinazioneMax) {
        if (comboMaxUtente.combo !== undefined && comboMaxUtente.cards !== undefined &&
            comboMaxPc.combo !== undefined && comboMaxPc.cards !== undefined
        ) {
            if (comboMaxUtente.combo > comboMaxPc.combo) {
                this.flag = 1
            }
            else if (comboMaxUtente.combo < comboMaxPc.combo) {
                this.flag = 2
            }
        }
    }



}

