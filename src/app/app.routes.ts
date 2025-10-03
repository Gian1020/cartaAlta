import { Routes } from '@angular/router';
import { CampoGioco } from './campo-gioco/campo-gioco';
import { HomeCasino } from './home-casino/home-casino';

export const routes: Routes = [{
    path: '',
    component: HomeCasino
  },
  {
    path: 'cartaAlta',
    component: CampoGioco
  },{
    path: 'poker3',
    component: CampoGioco
  },{
    path: 'blackJack',
    component: CampoGioco
  }];
