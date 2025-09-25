import { Card } from "./card";


export interface combinazioneMax {
    combo?:number;
    cards?:Card[];
}

/*LEGGENDA COMBO = 
                    0 --> carta alta
                    1 --> coppia
                    2 --> colore
                    3 --> scala
                    4 --> tris
                    5 --> scalaReale
                    */