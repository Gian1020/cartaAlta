import { Injectable } from "@angular/core";
import { Card } from "../campo-gioco/interfaccia/Card";
import { CombinazioneMax } from "../campo-gioco/interfaccia/ComboMaxPoker";

@Injectable({ providedIn: 'root' })
export class Poker3 {
    //contenitori carte
    carteUtente: Card[] = [];
    cartePc: Card[] = [];

    //oggetti che contengono combo e carte ordinate
    comboMaxUtente!: CombinazioneMax;
    comboMaxPc!: CombinazioneMax;

    //variabili che rappresentano il punteggio giocatori
    punteggioUtene: number = 0;
    punteggioPc: number = 0;

    //commento della vittoria di ogni round
    stringaComboRound!: string;
    commentoVincitoreRound!:string;

    //variabile per blocare il click del mazzo
    contatoreClick: number = 0;
    numeroCarteVisualizzazioneMazzo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    

    //variabili che servono per la card Winner
    flagVincitorePartita: number = 0;
    chiHaVinto: string = "";
    punteggioVincitore: string = "";
    country: string = "";
    classeCard: string = "";


    distribuisci(mazzo: Card[]) {
        this.cartePc = [];
        this.carteUtente = [];
        if (mazzo.length > 5) {
            this.contatoreClick++;
            //console.log(this.contatoreClick, "click");

            for (let i = 0; i < 3; i++) {

                // carta utente
                const cartaU = mazzo.shift()!;
                this.carteUtente.push(cartaU);

                // carta pc
                const cartaP = mazzo.shift()!;
                this.cartePc.push(cartaP);
            }
            this.sfoltisciMazzo()
            //funzione che controlla la vitoria
            this.checkWinnerRound(this.controlloMaxPunteggio(this.carteUtente), this.controlloMaxPunteggio(this.cartePc));
            
            this.commentoVincitoreRound= "Ha vinto il giocatore "+ this.stringaComboRound +" il round numero " +this.contatoreClick;

            this.vincitoreFinale();
        }
    }

    sfoltisciMazzo() {
        if (this.contatoreClick % 1 == 0) {
            this.numeroCarteVisualizzazioneMazzo.pop();
        }
    }

    controlloMaxPunteggio(carteGiocatoreDaControllare: Card[]): CombinazioneMax {
        let chiControlliamo = [...carteGiocatoreDaControllare];
        chiControlliamo.sort((a, b) => (a.numero ?? 0) - (b.numero ?? 0));
        chiControlliamo.every(el => el !== undefined);

        switch (true) {
            //case scala reale
            case (this.controlloSeScala(chiControlliamo) && this.controlloSimbolo(chiControlliamo)):
                return {
                    combo: 5,
                    cards: chiControlliamo,
                    nomeCombo: "Scala reale"
                }
            //case tris
            case (chiControlliamo[0].numero == chiControlliamo[1].numero && chiControlliamo[0].numero == chiControlliamo[2].numero):
                return {
                    combo: 4,
                    cards: chiControlliamo,
                    nomeCombo: "Tris"
                }
            //case scala
            case (this.controlloSeScala(chiControlliamo)):
                return {
                    combo: 3,
                    cards: chiControlliamo,
                    nomeCombo: "Scala"
                }
            //case colore
            case (this.controlloSimbolo(chiControlliamo)):
                return {
                    combo: 2,
                    cards: chiControlliamo,
                    nomeCombo:"Colore"
                }

            //case coppia
            case (this.controlloCoppia(chiControlliamo)):
                return {
                    combo: 1,
                    cards: chiControlliamo,
                    nomeCombo:"Coppia"
                }

            //default carta alta
            default:
                return {
                    combo: 0,
                    cards: chiControlliamo,
                    nomeCombo:"Carta Alta"
                }
        }
    }

    controlloCoppia(mano: Card[]) {
        for (let i = 0; i < mano.length - 1; i++) {
            for (let j = i + 1; j < mano.length; j++) {
                if ((mano[i].numero ?? 0) === (mano[j].numero ?? 0)) {
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
            if ((mano[i].seme ?? 0) == (mano[i + 1].seme ?? 0)) {
                contatore++
            }
        }
        if (contatore === mano.length - 1) {
            return true;
        }
        else return false;
    }

    vincitoreFinale() {
        if (this.contatoreClick == 8) {
            if (this.punteggioUtene > this.punteggioPc) {
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
            else {
                this.flagVincitorePartita = 3;
                this.chiHaVinto = "Patta";
                this.punteggioVincitore = "Punteggio: PARI";
                this.classeCard = "card-pc";
            }
        }
    }

    checkWinnerRound(comboMaxUtente: CombinazioneMax, comboMaxPc: CombinazioneMax) {
        //da controllare con log tutti i pareggi
        switch (true) {
            //controllo combo --> vincitore Utente
            case (comboMaxUtente.combo > comboMaxPc.combo): {
                this.punteggioUtene++;
                this.stringaComboRound= "l'Utente con " + comboMaxUtente.nomeCombo;
                break;
            }
            //controllo combo --> vincitore Pc
            case (comboMaxUtente.combo < comboMaxPc.combo): {
                this.punteggioPc++;
                this.stringaComboRound="il PC con " +comboMaxPc.nomeCombo ;
                break;
            }
            //controllo combo --> pari
            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 5):
                {
                    this.controllaComboScala(comboMaxUtente, comboMaxPc)
                    break;
                }
            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 4):
                {
                    if (comboMaxUtente.cards[0].numero! > comboMaxPc.cards[0].numero!) {
                        this.punteggioUtene++;
                        this.stringaComboRound= "l'Utente con " + comboMaxUtente.nomeCombo;
                    }
                    else if (comboMaxUtente.cards[0].numero! < comboMaxPc.cards[0].numero!) {
                        this.punteggioPc++;
                        this.stringaComboRound="il PC con " +comboMaxPc.nomeCombo ;;
                    }
                    break;
                }

            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 3):
                {
                    this.controllaComboScala(comboMaxUtente, comboMaxPc)
                    break;
                }

            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 2):
                {
                    this.controlloCartaAlta(comboMaxUtente, comboMaxPc);
                    break;
                }

            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 1): {
                if (comboMaxUtente.cards[1].numero! > comboMaxPc.cards[1].numero!) {
                    this.punteggioUtene++;
                    this.stringaComboRound= "l'Utente con " + comboMaxUtente.nomeCombo;
                }
                else if (comboMaxUtente.cards[1].numero! < comboMaxPc.cards[1].numero!) {
                    this.punteggioPc++;
                    this.stringaComboRound="il PC con " +comboMaxPc.nomeCombo ;
                }
                else {
                    let valoreCheNonCoppiaUtente: number = this.trovaDiverso(comboMaxUtente.cards[0].numero!, comboMaxUtente.cards[1].numero!, comboMaxUtente.cards[2].numero!);
                    let valoreCheNonCoppiaPC: number = this.trovaDiverso(comboMaxPc.cards[0].numero!, comboMaxPc.cards[1].numero!, comboMaxPc.cards[2].numero!);
                    if (valoreCheNonCoppiaUtente > valoreCheNonCoppiaPC) {
                        this.punteggioUtene++;
                        this.stringaComboRound= "l'Utente con " + comboMaxUtente.nomeCombo;
                    }
                    else if (valoreCheNonCoppiaUtente < valoreCheNonCoppiaPC) {
                        this.punteggioPc++;
                        this.stringaComboRound="il PC con " +comboMaxPc.nomeCombo ;
                    }
                }

                break;
            }

            case (comboMaxUtente.combo == comboMaxPc.combo && comboMaxUtente.combo == 0): {
                this.controlloCartaAlta(comboMaxUtente, comboMaxPc);
                break;
            }

        }


    } trovaDiverso(a: number, b: number, c: number) {
        if (a === b) return c;
        if (a === c) return b;
        return a; // per forza b === c
    }
    controllaComboScala(comboMaxUtente: CombinazioneMax, comboMaxPc: CombinazioneMax) {
        if (comboMaxUtente.cards[0].numero! > comboMaxPc.cards[0].numero!) {
            this.punteggioUtene++;
            this.stringaComboRound= "l'Utente con " + comboMaxUtente.nomeCombo;
        }
        else if (comboMaxUtente.cards[0].numero! < comboMaxPc.cards[0].numero!) {
            this.punteggioPc++;
            this.stringaComboRound="il PC con " +comboMaxPc.nomeCombo ;
        }
        else if (comboMaxUtente.cards[0].numero! == comboMaxPc.cards[0].numero!) {
            if (comboMaxUtente.cards[0].numero == 2) {
                if (comboMaxUtente.cards[comboMaxUtente.cards.length - 1].numero! < comboMaxPc.cards[comboMaxPc.cards.length - 1].numero!) {
                    this.punteggioUtene++;
                    this.stringaComboRound= "l'Utente con " + comboMaxUtente.nomeCombo;
                }
                else {
                    this.punteggioPc++;
                    this.stringaComboRound="il PC con " +comboMaxPc.nomeCombo ;
                }
            }
        }
    }
    controlloCartaAlta(comboMaxUtente: CombinazioneMax, comboMaxPc: CombinazioneMax) {
        for (let i = comboMaxUtente.cards.length - 1; i >= 0; i--) {
            if (comboMaxUtente.cards[i].numero! > comboMaxPc.cards[i].numero!) {
                this.punteggioUtene++;
                this.stringaComboRound= "l'Utente con " + comboMaxUtente.nomeCombo;
                break;
            }
            if (comboMaxUtente.cards[i].numero! < comboMaxPc.cards[i].numero!) {
                this.punteggioPc++;
                this.stringaComboRound="il PC con " +comboMaxPc.nomeCombo ;
                break;
            }
        }
    }

}



