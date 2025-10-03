
import { Injectable } from "@angular/core";
import { Card } from "../campo-gioco/interfaccia/Card";

@Injectable({ providedIn: 'root' })
export class BlackJack {
    carteUtente: Card[] = [];
    cartePc: Card[] = [];
    contatoreClick!: number;
    punteggioUtente!: number;
    punteggioPc!: number;
    punteggioGiocatore: number = 0;
    flagSto: boolean = false;
    flagBottoneOffChiamaCarta = false;
    flagBottoneOffDistribuisci = false;
    flagTurno: number = 1;
    tuplaValori: { [key: number]: number } = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 10, 12: 10, 13: 10, 14: 11 };

    distribuisci(mazzo: Card[]) {
        if (!this.flagBottoneOffDistribuisci) {
            for (let i = 0; i < 2; i++) {

                let cartaU = mazzo.shift()!;
                this.carteUtente.push(cartaU);

                let cartaP = mazzo.shift()!;
                this.cartePc.push(cartaP);
            }
        }
        this.flagBottoneOffDistribuisci=true;

    }

    chiamaCarta(mazzo: Card[]) {
        let cartaChiamata = mazzo.shift()!;
        if (this.flagTurno == 1) {
            this.carteUtente.push(cartaChiamata);
        }
        else if (this.flagTurno == 2) {
            this.cartePc.push(cartaChiamata);
        }
    }

    calcoloPunteggio(carteGiocatore: Card[]) {
        for (let i = 0; i < carteGiocatore.length; i++) {
            this.punteggioGiocatore += this.tuplaValori[carteGiocatore[i].numero!];
            if (this.punteggioGiocatore > 21 && carteGiocatore[i].numero == 14) {
                this.punteggioGiocatore -= 10;
            }
            else if (this.punteggioGiocatore > 21) {
                this.punteggioGiocatore = -1;
                //blocco bottone chiama carta
                this.flagBottoneOffChiamaCarta = true;
            }
            if (this.flagSto) {
                //blocco bottone chiama carta
                this.flagBottoneOffChiamaCarta = true;
                
                return;
            }
        }
    }

    trovaIlPunteggioCarte(card: Card) {

    }

}