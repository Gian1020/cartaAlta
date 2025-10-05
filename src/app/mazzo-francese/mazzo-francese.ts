import { Component } from '@angular/core';
import { Card } from '../campo-gioco/interfaccia/Card';

@Component({
  selector: 'app-mazzo-francese',
  imports: [],
  templateUrl: './mazzo-francese.html',
  styleUrl: './mazzo-francese.css'
})
export class MazzoFrancese {
  mazzo: Card[] = [];
  semi: string[] = ["S", "C", "D", "H"];
  numeri: string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  nCarteSfoltireMazzo!: number[];
  contatoreClick!: number;
  commentoVincitoreRound!: number;
  valoreCondizioneBloccoClick!: number;
  funzione!: any;

  creaCarte() {
    for (let seme of this.semi) {
      for (let numero of this.numeri) {
        let carta: Card = { numero: numero, seme: seme }
        this.mazzo.push(carta);
      }
    }
  }

  //algoritmo Fisher–Yates
  mischia() {
    for (let i = this.mazzo.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // indice casuale tra 0 e i
      [this.mazzo[i], this.mazzo[j]] = [this.mazzo[j], this.mazzo[i]]; // swap
    }
  }
}
