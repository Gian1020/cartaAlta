import { Card } from "./Card";

export interface StatoCarta {
  cartaUtente: Card[];
  cartaPc: Card[];
  contatore: number;
  punteggio1: number;
  punteggio2: number;
  registroCarteUtente: Card[];
  registroCartePc: Card[];
  contatoreClick: number;
  numeroCarteVisualizzazioneMazzo: number[];
  chiHaVinto: number;
  vincitore: string;
  country: string;
  punteggioVincitore: string;
  classeCard: string;
}