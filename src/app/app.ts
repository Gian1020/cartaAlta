import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampoGioco } from './campo-gioco/campo-gioco';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CampoGioco],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('carte-alta');
}
